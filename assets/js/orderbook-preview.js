(() => {
  "use strict";

  const STREAM_PATH = "btcusdt@depth20@100ms/btcusdt@aggTrade/btcusdt@ticker";
  const ENDPOINTS = [
    `wss://data-stream.binance.vision/stream?streams=${STREAM_PATH}`,
    `wss://stream.binance.com:9443/stream?streams=${STREAM_PATH}`,
    `wss://stream.binance.com:443/stream?streams=${STREAM_PATH}`
  ];

  const priceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2
  });
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const SIMULATED_QUOTE_SIZE = 0.01;
  const FLOW_WINDOW_MS = 5000;

  const elements = {
    body: document.body,
    bidBook: document.getElementById("bid-book"),
    askBook: document.getElementById("ask-book"),
    lastPrice: document.getElementById("last-price"),
    lastSize: document.getElementById("last-size"),
    lastTime: document.getElementById("last-time"),
    spreadValue: document.getElementById("spread-value"),
    spreadBps: document.getElementById("spread-bps"),
    midPrice: document.getElementById("mid-price"),
    imbalance: document.getElementById("imbalance"),
    change24h: document.getElementById("change-24h"),
    high24h: document.getElementById("high-24h"),
    low24h: document.getElementById("low-24h"),
    volume24h: document.getElementById("volume-24h"),
    analyticsMid: document.getElementById("analytics-mid"),
    analyticsMicroprice: document.getElementById("analytics-microprice"),
    micropriceSkew: document.getElementById("microprice-skew"),
    analyticsSpread: document.getElementById("analytics-spread"),
    analyticsSpreadUsdt: document.getElementById("analytics-spread-usdt"),
    bidQueue: document.getElementById("bid-queue"),
    askQueue: document.getElementById("ask-queue"),
    analyticsImbalance: document.getElementById("analytics-imbalance"),
    bidFillProxy: document.getElementById("bid-fill-proxy"),
    askFillProxy: document.getElementById("ask-fill-proxy"),
    markout1s: document.getElementById("markout-1s"),
    markout5s: document.getElementById("markout-5s"),
    flowImbalance: document.getElementById("flow-imbalance"),
    flowDetail: document.getElementById("flow-detail"),
    updateRate: document.getElementById("update-rate"),
    depthChart: document.getElementById("depth-chart"),
    connectionLabel: document.getElementById("connection-label"),
    latencyLabel: document.getElementById("latency-label"),
    tradeTape: document.getElementById("trade-tape")
  };

  const state = {
    bids: [],
    asks: [],
    trades: [],
    recentFlow: [],
    currentMid: null,
    currentMicroprice: null,
    markouts1s: [],
    markouts5s: [],
    markoutTimers: new Set(),
    lastMarkoutCaptureAt: 0,
    messageCount: 0,
    lastTradePrice: null,
    lastMessageAt: 0,
    lastStatusAt: 0,
    connectionStatus: "",
    endpointIndex: 0,
    retryCount: 0,
    reconnectTimer: null,
    staleTimer: null,
    rateTimer: null,
    tradeRenderTimer: null,
    pendingTrade: null,
    socket: null,
    destroyed: false,
    bookDirty: false,
    renderQueued: false,
    chartRenderQueued: false,
    depthChartObserver: null
  };

  function levelCount() {
    if (window.innerWidth <= 780) return 5;
    return 8;
  }

  function createRows(container, side) {
    const fragment = document.createDocumentFragment();
    const count = levelCount();
    container.replaceChildren();

    for (let index = 0; index < count; index += 1) {
      const row = document.createElement("div");
      row.className = "book-row is-empty";
      row.dataset.side = side;
      row.style.setProperty("--placeholder-depth", `${22 + ((index * 19) % 63)}%`);

      const price = document.createElement("span");
      price.className = "book-row__price";
      price.textContent = "—";

      const amount = document.createElement("span");
      amount.className = "book-row__amount";
      amount.textContent = "—";

      const total = document.createElement("span");
      total.className = "book-row__total";
      total.textContent = "—";

      row.append(price, amount, total);
      fragment.append(row);
    }

    container.append(fragment);
  }

  function resetRows() {
    createRows(elements.bidBook, "bid");
    createRows(elements.askBook, "ask");
    if (state.bids.length || state.asks.length) scheduleBookRender();
  }

  function formatAmount(value) {
    if (!Number.isFinite(value)) return "—";
    if (value >= 100) return value.toFixed(2);
    if (value >= 1) return value.toFixed(4);
    return value.toFixed(5);
  }

  function renderSide(container, levels, side) {
    const rows = Array.from(container.children);
    const visibleLevels = levels.slice(0, rows.length);
    const cumulative = [];
    let runningTotal = 0;

    visibleLevels.forEach(([, quantity]) => {
      runningTotal += quantity;
      cumulative.push(runningTotal);
    });

    const maxTotal = cumulative[cumulative.length - 1] || 1;

    rows.forEach((row, index) => {
      const level = visibleLevels[index];
      if (!level) {
        row.classList.add("is-empty");
        row.style.setProperty("--depth", "0%");
        row.children[0].textContent = "—";
        row.children[1].textContent = "—";
        row.children[2].textContent = "—";
        row.removeAttribute("aria-label");
        return;
      }

      const [price, quantity] = level;
      const total = cumulative[index];
      row.classList.remove("is-empty");
      row.style.setProperty("--depth", `${Math.max(3, (total / maxTotal) * 100).toFixed(1)}%`);
      row.children[0].textContent = priceFormatter.format(price);
      row.children[1].textContent = formatAmount(quantity);
      row.children[2].textContent = formatAmount(total);
      row.setAttribute("aria-label", `${side} ${priceFormatter.format(price)}, ${formatAmount(quantity)} bitcoin`);
    });
  }

  function renderBook() {
    state.renderQueued = false;
    if (!state.bookDirty) return;
    state.bookDirty = false;

    renderSide(elements.bidBook, state.bids, "bid");
    renderSide(elements.askBook, state.asks, "ask");

    const bestBid = state.bids[0]?.[0];
    const bestAsk = state.asks[0]?.[0];
    if (!bestBid || !bestAsk) return;

    const spread = bestAsk - bestBid;
    const mid = (bestAsk + bestBid) / 2;
    const spreadBps = (spread / mid) * 10000;
    const bestBidQuantity = state.bids[0][1];
    const bestAskQuantity = state.asks[0][1];
    const topDenominator = bestBidQuantity + bestAskQuantity;
    const microprice = topDenominator
      ? ((bestAsk * bestBidQuantity) + (bestBid * bestAskQuantity)) / topDenominator
      : mid;
    state.currentMid = mid;
    state.currentMicroprice = microprice;
    elements.spreadValue.textContent = `${priceFormatter.format(spread)} USDT`;
    elements.spreadBps.textContent = `${spreadBps.toFixed(2)} BPS`;
    elements.midPrice.textContent = priceFormatter.format(mid);

    const bidLiquidity = state.bids.slice(0, 10).reduce((sum, [, quantity]) => sum + quantity, 0);
    const askLiquidity = state.asks.slice(0, 10).reduce((sum, [, quantity]) => sum + quantity, 0);
    const denominator = bidLiquidity + askLiquidity;
    const imbalance = denominator ? ((bidLiquidity - askLiquidity) / denominator) * 100 : 0;
    elements.imbalance.textContent = `${imbalance >= 0 ? "+" : ""}${imbalance.toFixed(1)}%`;
    elements.imbalance.style.color = imbalance >= 0 ? "var(--bid)" : "var(--ask)";
    updateAnalytics({
      bestBid,
      bestAsk,
      bestBidQuantity,
      bestAskQuantity,
      spread,
      spreadBps,
      mid,
      microprice,
      imbalance
    });
    scheduleDepthChart();
  }

  function setMetricTone(element, value) {
    element.classList.toggle("is-positive", value > 0);
    element.classList.toggle("is-negative", value < 0);
  }

  function signedPercent(value) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  }

  function signedBps(value) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)} BPS`;
  }

  function updateAnalytics(metrics) {
    const now = Date.now();
    state.recentFlow = state.recentFlow.filter((trade) => now - trade.time <= FLOW_WINDOW_MS);

    const buyFlow = state.recentFlow
      .filter((trade) => !trade.isSell)
      .reduce((sum, trade) => sum + trade.quantity, 0);
    const sellFlow = state.recentFlow
      .filter((trade) => trade.isSell)
      .reduce((sum, trade) => sum + trade.quantity, 0);
    const totalFlow = buyFlow + sellFlow;
    const flowImbalance = totalFlow ? ((buyFlow - sellFlow) / totalFlow) * 100 : 0;
    const bidFillProxy = Math.min(99.9, (sellFlow / (metrics.bestBidQuantity + SIMULATED_QUOTE_SIZE)) * 100);
    const askFillProxy = Math.min(99.9, (buyFlow / (metrics.bestAskQuantity + SIMULATED_QUOTE_SIZE)) * 100);
    const micropriceSkew = ((metrics.microprice - metrics.mid) / metrics.mid) * 10000;

    elements.analyticsMid.textContent = priceFormatter.format(metrics.mid);
    elements.analyticsMicroprice.textContent = priceFormatter.format(metrics.microprice);
    elements.micropriceSkew.textContent = `${signedBps(micropriceSkew)} VS MID`;
    elements.analyticsSpread.textContent = `${metrics.spreadBps.toFixed(2)} BPS`;
    elements.analyticsSpreadUsdt.textContent = `${priceFormatter.format(metrics.spread)} USDT`;
    elements.bidQueue.textContent = `${formatAmount(metrics.bestBidQuantity)} BTC`;
    elements.askQueue.textContent = `${formatAmount(metrics.bestAskQuantity)} BTC`;
    elements.analyticsImbalance.textContent = signedPercent(metrics.imbalance);
    elements.bidFillProxy.textContent = `${bidFillProxy.toFixed(1)}%`;
    elements.askFillProxy.textContent = `${askFillProxy.toFixed(1)}%`;
    elements.flowImbalance.textContent = signedPercent(flowImbalance);
    elements.flowDetail.textContent = `BUY ${formatAmount(buyFlow)} · SELL ${formatAmount(sellFlow)} BTC`;

    setMetricTone(elements.analyticsImbalance, metrics.imbalance);
    setMetricTone(elements.flowImbalance, flowImbalance);
    setMetricTone(elements.analyticsMicroprice, micropriceSkew);
  }

  function cumulativeLevels(levels) {
    let total = 0;
    return levels.slice(0, 20).map(([price, quantity]) => {
      total += quantity;
      return { price, total };
    });
  }

  function scheduleDepthChart() {
    if (state.chartRenderQueued) return;
    state.chartRenderQueued = true;
    window.requestAnimationFrame(() => {
      state.chartRenderQueued = false;
      drawDepthChart();
    });
  }

  function drawDepthChart() {
    const canvas = elements.depthChart;
    const bidDepth = cumulativeLevels(state.bids);
    const askDepth = cumulativeLevels(state.asks);
    if (!canvas || !bidDepth.length || !askDepth.length) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width < 80 || rect.height < 80) return;

    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
    const displayWidth = Math.round(rect.width);
    const displayHeight = Math.round(rect.height);
    const targetWidth = Math.round(displayWidth * pixelRatio);
    const targetHeight = Math.round(displayHeight * pixelRatio);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const context = canvas.getContext("2d");
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, displayWidth, displayHeight);

    const padding = { top: 30, right: 18, bottom: 34, left: 48 };
    const chartWidth = displayWidth - padding.left - padding.right;
    const chartHeight = displayHeight - padding.top - padding.bottom;
    const minPrice = bidDepth[bidDepth.length - 1].price;
    const maxPrice = askDepth[askDepth.length - 1].price;
    const range = Math.max(maxPrice - minPrice, 1);
    const maxQuantity = Math.max(bidDepth[bidDepth.length - 1].total, askDepth[askDepth.length - 1].total, 0.0001);
    const bestBid = bidDepth[0].price;
    const bestAsk = askDepth[0].price;
    const mid = (bestBid + bestAsk) / 2;
    const x = (price) => padding.left + ((price - minPrice) / range) * chartWidth;
    const y = (quantity) => padding.top + chartHeight - (quantity / maxQuantity) * chartHeight;
    const baseline = padding.top + chartHeight;

    context.lineWidth = 1;
    context.font = '10px "SFMono-Regular", Consolas, monospace';
    context.textBaseline = "middle";
    for (let index = 0; index <= 4; index += 1) {
      const quantity = (maxQuantity / 4) * index;
      const lineY = y(quantity);
      context.strokeStyle = "rgba(148, 163, 184, 0.12)";
      context.beginPath();
      context.moveTo(padding.left, lineY);
      context.lineTo(displayWidth - padding.right, lineY);
      context.stroke();
      context.fillStyle = "rgba(148, 163, 184, 0.55)";
      context.textAlign = "right";
      context.fillText(formatAmount(quantity), padding.left - 8, lineY);
    }

    function drawStep(points, stroke, fill) {
      const ordered = points;
      context.beginPath();
      context.moveTo(x(ordered[0].price), baseline);
      context.lineTo(x(ordered[0].price), y(ordered[0].total));
      for (let index = 1; index < ordered.length; index += 1) {
        context.lineTo(x(ordered[index].price), y(ordered[index - 1].total));
        context.lineTo(x(ordered[index].price), y(ordered[index].total));
      }
      context.lineTo(x(ordered[ordered.length - 1].price), baseline);
      context.closePath();
      context.fillStyle = fill;
      context.fill();

      context.beginPath();
      context.moveTo(x(ordered[0].price), y(ordered[0].total));
      for (let index = 1; index < ordered.length; index += 1) {
        context.lineTo(x(ordered[index].price), y(ordered[index - 1].total));
        context.lineTo(x(ordered[index].price), y(ordered[index].total));
      }
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.stroke();
    }

    drawStep([...bidDepth].reverse(), "#00d99b", "rgba(0, 217, 155, 0.16)");
    drawStep(askDepth, "#ff506f", "rgba(255, 80, 111, 0.16)");

    function drawReference(price, color, label) {
      const lineX = x(price);
      context.setLineDash([3, 4]);
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(lineX, padding.top);
      context.lineTo(lineX, baseline);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = color;
      context.textAlign = price <= mid ? "right" : "left";
      context.fillText(label, lineX + (price <= mid ? -5 : 5), padding.top - 12);
    }

    drawReference(bestBid, "#00d99b", `BID ${priceFormatter.format(bestBid)}`);
    drawReference(bestAsk, "#ff506f", `ASK ${priceFormatter.format(bestAsk)}`);

    context.fillStyle = "rgba(169, 178, 193, 0.72)";
    context.textAlign = "center";
    context.fillText(`MID ${priceFormatter.format(mid)}`, x(mid), padding.top - 12);

    const xLabels = [minPrice, bestBid, mid, bestAsk, maxPrice];
    xLabels.forEach((price, index) => {
      context.fillStyle = "rgba(148, 163, 184, 0.58)";
      context.textAlign = index === 0 ? "left" : index === xLabels.length - 1 ? "right" : "center";
      context.fillText(priceFormatter.format(price), x(price), baseline + 18);
    });

    canvas.setAttribute(
      "aria-label",
      `BTCUSDT cumulative depth. Best bid ${priceFormatter.format(bestBid)}, best ask ${priceFormatter.format(bestAsk)}, mid ${priceFormatter.format(mid)}.`
    );
  }

  function scheduleBookRender() {
    state.bookDirty = true;
    if (state.renderQueued) return;
    state.renderQueued = true;
    window.requestAnimationFrame(renderBook);
  }

  function parseLevels(levels, descending) {
    return levels
      .map(([price, quantity]) => [Number(price), Number(quantity)])
      .filter(([price, quantity]) => Number.isFinite(price) && Number.isFinite(quantity) && quantity > 0)
      .sort((left, right) => descending ? right[0] - left[0] : left[0] - right[0]);
  }

  function updateDepth(data) {
    state.bids = parseLevels(data.bids || [], true);
    state.asks = parseLevels(data.asks || [], false);
    scheduleBookRender();
  }

  function updateLastTrade(data) {
    const price = Number(data.p);
    const quantity = Number(data.q);
    if (!Number.isFinite(price) || !Number.isFinite(quantity)) return;

    const isSell = Boolean(data.m);
    state.lastTradePrice = price;
    const tradeTime = Number(data.T) || Date.now();
    state.pendingTrade = { price, quantity, isSell, time: tradeTime };
    state.trades.unshift({ price, quantity, isSell });
    state.trades = state.trades.slice(0, 14);
    state.recentFlow.push({ price, quantity, isSell, time: tradeTime });
    if (state.recentFlow.length > 2500) state.recentFlow = state.recentFlow.slice(-2000);
    captureMarkout({ price, isSell, time: tradeTime });
    scheduleTradeRender();
  }

  function captureMarkout(trade) {
    const now = Date.now();
    if (!state.currentMid || now - state.lastMarkoutCaptureAt < 350) return;
    state.lastMarkoutCaptureAt = now;
    const direction = trade.isSell ? -1 : 1;

    [[1000, state.markouts1s, elements.markout1s], [5000, state.markouts5s, elements.markout5s]]
      .forEach(([horizon, samples, element]) => {
        const timer = window.setTimeout(() => {
          state.markoutTimers.delete(timer);
          if (!state.currentMid || state.destroyed) return;
          const markout = direction * ((state.currentMid - trade.price) / trade.price) * 10000;
          samples.push(markout);
          if (samples.length > 40) samples.shift();
          const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;
          element.textContent = signedBps(average);
          setMetricTone(element, average);
        }, horizon);
        state.markoutTimers.add(timer);
      });
  }

  function scheduleTradeRender() {
    if (state.tradeRenderTimer) return;
    state.tradeRenderTimer = window.setTimeout(() => {
      state.tradeRenderTimer = null;
      const trade = state.pendingTrade;
      if (!trade) return;

      elements.lastPrice.textContent = priceFormatter.format(trade.price);
      elements.lastPrice.classList.toggle("is-buy", !trade.isSell);
      elements.lastPrice.classList.toggle("is-sell", trade.isSell);
      elements.lastSize.textContent = `${formatAmount(trade.quantity)} BTC · ${trade.isSell ? "SELL" : "BUY"}`;
      elements.lastTime.textContent = timeFormatter.format(new Date(trade.time));
      renderTrades();
    }, 100);
  }

  function renderTrades() {
    const fragment = document.createDocumentFragment();
    state.trades.forEach((trade) => {
      const chip = document.createElement("span");
      chip.className = `trade-chip${trade.isSell ? " is-sell" : ""}`;

      const price = document.createElement("strong");
      price.textContent = priceFormatter.format(trade.price);

      const quantity = document.createElement("span");
      quantity.textContent = formatAmount(trade.quantity);

      chip.append(price, quantity);
      fragment.append(chip);
    });
    elements.tradeTape.replaceChildren(fragment);
  }

  function updateTicker(data) {
    const change = Number(data.P);
    const high = Number(data.h);
    const low = Number(data.l);
    const quoteVolume = Number(data.q);

    if (Number.isFinite(change)) {
      elements.change24h.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
      elements.change24h.style.color = change >= 0 ? "var(--bid)" : "var(--ask)";
    }
    if (Number.isFinite(high)) elements.high24h.textContent = priceFormatter.format(high);
    if (Number.isFinite(low)) elements.low24h.textContent = priceFormatter.format(low);
    if (Number.isFinite(quoteVolume)) elements.volume24h.textContent = `${compactFormatter.format(quoteVolume)} USDT`;
  }

  function setConnection(status, detail) {
    if (state.connectionStatus !== status) {
      elements.body.classList.remove("is-connecting", "is-live", "is-stale", "is-offline");
      elements.body.classList.add(`is-${status}`);
      elements.connectionLabel.textContent = status === "live" ? "LIVE" : status.toUpperCase();
      state.connectionStatus = status;
    }
    if (elements.latencyLabel.textContent !== detail) elements.latencyLabel.textContent = detail;
  }

  function noteMessage(eventTime) {
    const now = Date.now();
    state.lastMessageAt = now;
    if (state.connectionStatus !== "live") setConnection("live", "STREAMING");
    if (Number(eventTime) && now - state.lastStatusAt > 500) {
      const latency = Math.max(0, now - Number(eventTime));
      setConnection("live", `${latency}MS LATENCY`);
      state.lastStatusAt = now;
    }
  }

  function handleMessage(event) {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }

    const stream = message.stream || "";
    const data = message.data || message;
    state.messageCount += 1;
    state.retryCount = 0;
    noteMessage(data.E || data.T);

    if (stream.includes("@depth20") || data.lastUpdateId) updateDepth(data);
    if (stream.includes("@aggTrade") || data.e === "aggTrade") updateLastTrade(data);
    if (stream.includes("@ticker") || data.e === "24hrTicker") updateTicker(data);
  }

  function scheduleReconnect() {
    if (state.destroyed || state.reconnectTimer) return;
    const delay = Math.min(30000, 1000 * (2 ** Math.min(state.retryCount, 5)));
    state.retryCount += 1;
    state.endpointIndex = (state.endpointIndex + 1) % ENDPOINTS.length;
    setConnection("offline", `RETRY ${Math.ceil(delay / 1000)}S`);
    state.reconnectTimer = window.setTimeout(() => {
      state.reconnectTimer = null;
      connect();
    }, delay);
  }

  function connect() {
    if (state.destroyed) return;
    if (state.socket && state.socket.readyState < WebSocket.CLOSING) state.socket.close();

    setConnection("connecting", "MARKET DATA");
    const socket = new WebSocket(ENDPOINTS[state.endpointIndex]);
    state.socket = socket;

    socket.addEventListener("open", () => {
      if (socket !== state.socket) return;
      state.lastMessageAt = Date.now();
      setConnection("live", "STREAM OPEN");
    });

    socket.addEventListener("message", (event) => {
      if (socket === state.socket) handleMessage(event);
    });

    socket.addEventListener("error", () => {
      if (socket === state.socket) socket.close();
    });

    socket.addEventListener("close", () => {
      if (socket !== state.socket) return;
      state.socket = null;
      scheduleReconnect();
    });
  }

  function watchForStaleData() {
    state.staleTimer = window.setInterval(() => {
      if (!state.lastMessageAt || !state.socket) return;
      const silence = Date.now() - state.lastMessageAt;
      if (silence > 12000) {
        setConnection("offline", "RECONNECTING");
        state.socket.close();
      } else if (silence > 5000) {
        setConnection("stale", `${Math.round(silence / 1000)}S NO DATA`);
      }
    }, 2000);

    state.rateTimer = window.setInterval(() => {
      elements.updateRate.textContent = `${state.messageCount} MSG/S`;
      state.messageCount = 0;
    }, 1000);
  }

  function destroy() {
    state.destroyed = true;
    window.clearTimeout(state.reconnectTimer);
    window.clearTimeout(state.tradeRenderTimer);
    window.clearInterval(state.staleTimer);
    window.clearInterval(state.rateTimer);
    state.markoutTimers.forEach((timer) => window.clearTimeout(timer));
    if (state.depthChartObserver) state.depthChartObserver.disconnect();
    if (state.socket) state.socket.close();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resetRows();
      scheduleDepthChart();
    }, 120);
  });
  window.addEventListener("beforeunload", destroy, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (!state.socket || state.socket.readyState === WebSocket.CLOSED)) connect();
  });

  resetRows();
  if ("ResizeObserver" in window && elements.depthChart) {
    state.depthChartObserver = new ResizeObserver(scheduleDepthChart);
    state.depthChartObserver.observe(elements.depthChart);
  }
  watchForStaleData();
  connect();
})();
