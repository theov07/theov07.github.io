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
  const SIMULATED_QUOTE_SIZE = 0.002;
  const FLOW_WINDOW_MS = 5000;
  const PAPER_HISTORY_LIMIT = 240;
  const PAPER_HISTORY_INTERVAL_MS = 500;
  const PAPER_INVENTORY_LIMIT = 0.02;
  const LIVE_SESSION_LIMIT_MS = 5 * 60 * 1000;

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
    bidDepth: document.getElementById("bid-depth"),
    askDepth: document.getElementById("ask-depth"),
    bidSellFlow: document.getElementById("bid-sell-flow"),
    askBuyFlow: document.getElementById("ask-buy-flow"),
    change24h: document.getElementById("change-24h"),
    high24h: document.getElementById("high-24h"),
    low24h: document.getElementById("low-24h"),
    volume24h: document.getElementById("volume-24h"),
    analyticsMicroprice: document.getElementById("analytics-microprice"),
    micropriceSkew: document.getElementById("microprice-skew"),
    bidQueue: document.getElementById("bid-queue"),
    askQueue: document.getElementById("ask-queue"),
    analyticsImbalance: document.getElementById("analytics-imbalance"),
    bidFillProxy: document.getElementById("bid-fill-proxy"),
    askFillProxy: document.getElementById("ask-fill-proxy"),
    markout1s: document.getElementById("markout-1s"),
    markout5s: document.getElementById("markout-5s"),
    depthChart: document.getElementById("depth-chart"),
    paperChart: document.getElementById("paper-chart"),
    paperChartTitle: document.getElementById("paper-chart-title"),
    paperChartTabs: Array.from(document.querySelectorAll("[data-paper-chart]")),
    paperBidQuote: document.getElementById("paper-bid-quote"),
    paperAskQuote: document.getElementById("paper-ask-quote"),
    paperBidStatus: document.getElementById("paper-bid-status"),
    paperAskStatus: document.getElementById("paper-ask-status"),
    paperBidQueue: document.getElementById("paper-bid-queue"),
    paperAskQueue: document.getElementById("paper-ask-queue"),
    paperBidQueueBar: document.getElementById("paper-bid-queue-bar"),
    paperAskQueueBar: document.getElementById("paper-ask-queue-bar"),
    paperBidFills: document.getElementById("paper-bid-fills"),
    paperAskFills: document.getElementById("paper-ask-fills"),
    paperBidLast: document.getElementById("paper-bid-last"),
    paperAskLast: document.getElementById("paper-ask-last"),
    paperPnl: document.getElementById("paper-pnl"),
    paperInventory: document.getElementById("paper-inventory"),
    paperFillCount: document.getElementById("paper-fill-count"),
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
    lastTradePrice: null,
    lastMessageAt: 0,
    lastStatusAt: 0,
    connectionStatus: "",
    endpointIndex: 0,
    retryCount: 0,
    reconnectTimer: null,
    staleTimer: null,
    sessionTimer: null,
    tradeRenderTimer: null,
    pendingTrade: null,
    socket: null,
    destroyed: false,
    sessionExpired: false,
    suspended: document.hidden,
    sessionDeadline: Date.now() + LIVE_SESSION_LIMIT_MS,
    bookDirty: false,
    renderQueued: false,
    chartRenderQueued: false,
    paperChartRenderQueued: false,
    depthChartObserver: null,
    paperChartObserver: null,
    paper: {
      bidQuote: null,
      askQuote: null,
      bidQueueAhead: 0,
      askQueueAhead: 0,
      bidQueueStart: 0,
      askQueueStart: 0,
      bidFills: 0,
      askFills: 0,
      inventory: 0,
      cash: 0,
      pnl: 0,
      fills: [],
      history: [],
      lastHistoryAt: 0,
      chartMode: "fills"
    }
  };

  function levelCount() {
    if (window.innerWidth <= 780) return 6;
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
    updatePaperQuotes({ bestBid, bestAsk, bestBidQuantity, bestAskQuantity, mid, microprice });
    recordPaperSnapshot(Date.now());
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
    schedulePaperChart();
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
    const bidFillProxy = Math.min(99.9, (sellFlow / (metrics.bestBidQuantity + SIMULATED_QUOTE_SIZE)) * 100);
    const askFillProxy = Math.min(99.9, (buyFlow / (metrics.bestAskQuantity + SIMULATED_QUOTE_SIZE)) * 100);
    const micropriceSkew = ((metrics.microprice - metrics.mid) / metrics.mid) * 10000;
    const displayedBidDepth = state.bids.slice(0, levelCount()).reduce((sum, [, quantity]) => sum + quantity, 0);
    const displayedAskDepth = state.asks.slice(0, levelCount()).reduce((sum, [, quantity]) => sum + quantity, 0);

    elements.midPrice.textContent = priceFormatter.format(metrics.mid);
    elements.analyticsMicroprice.textContent = priceFormatter.format(metrics.microprice);
    elements.micropriceSkew.textContent = `${signedBps(micropriceSkew)} VS MID`;
    elements.bidQueue.textContent = `${formatAmount(metrics.bestBidQuantity)} BTC`;
    elements.askQueue.textContent = `${formatAmount(metrics.bestAskQuantity)} BTC`;
    elements.bidDepth.textContent = `${formatAmount(displayedBidDepth)} BTC`;
    elements.askDepth.textContent = `${formatAmount(displayedAskDepth)} BTC`;
    elements.bidSellFlow.textContent = `${formatAmount(sellFlow)} BTC`;
    elements.askBuyFlow.textContent = `${formatAmount(buyFlow)} BTC`;
    elements.analyticsImbalance.textContent = signedPercent(metrics.imbalance);
    elements.bidFillProxy.textContent = `${bidFillProxy.toFixed(1)}%`;
    elements.askFillProxy.textContent = `${askFillProxy.toFixed(1)}%`;

    setMetricTone(elements.analyticsImbalance, metrics.imbalance);
    setMetricTone(elements.analyticsMicroprice, micropriceSkew);
  }

  function paperQueueSeed(displayedQuantity) {
    if (!Number.isFinite(displayedQuantity)) return 0.005;
    return Math.min(0.2, Math.max(0.005, displayedQuantity * 0.04));
  }

  function paperSideIsActive(side) {
    if (state.destroyed || state.sessionExpired) return false;
    return side === "bid"
      ? state.paper.inventory < PAPER_INVENTORY_LIMIT
      : state.paper.inventory > -PAPER_INVENTORY_LIMIT;
  }

  function updatePaperSummary() {
    const paper = state.paper;
    const pnlPrefix = paper.pnl > 0 ? "+" : "";
    const inventoryPrefix = paper.inventory > 0 ? "+" : "";
    const pnlDecimals = Math.abs(paper.pnl) < 0.1 ? 5 : Math.abs(paper.pnl) < 10 ? 3 : 2;
    elements.paperPnl.textContent = `${pnlPrefix}${paper.pnl.toFixed(pnlDecimals)} USDT`;
    elements.paperInventory.textContent = `${inventoryPrefix}${paper.inventory.toFixed(3)} BTC`;
    elements.paperFillCount.textContent = String(paper.bidFills + paper.askFills);
    setMetricTone(elements.paperPnl, paper.pnl);
    setMetricTone(elements.paperInventory, paper.inventory);
  }

  function renderPaperQuoteSide(side) {
    const paper = state.paper;
    const isBid = side === "bid";
    const quote = isBid ? paper.bidQuote : paper.askQuote;
    const queue = isBid ? paper.bidQueueAhead : paper.askQueueAhead;
    const queueStart = isBid ? paper.bidQueueStart : paper.askQueueStart;
    const fills = isBid ? paper.bidFills : paper.askFills;
    const quoteElement = isBid ? elements.paperBidQuote : elements.paperAskQuote;
    const statusElement = isBid ? elements.paperBidStatus : elements.paperAskStatus;
    const queueElement = isBid ? elements.paperBidQueue : elements.paperAskQueue;
    const queueBar = isBid ? elements.paperBidQueueBar : elements.paperAskQueueBar;
    const fillsElement = isBid ? elements.paperBidFills : elements.paperAskFills;
    const lastElement = isBid ? elements.paperBidLast : elements.paperAskLast;
    const lastFill = paper.fills.find((fill) => fill.side === side);
    const active = paperSideIsActive(side);
    const queuePercent = queueStart ? Math.max(0, Math.min(100, (queue / queueStart) * 100)) : 0;

    quoteElement.textContent = quote ? priceFormatter.format(quote) : "—";
    statusElement.textContent = state.sessionExpired
      ? "SESSION PAUSED"
      : active
        ? "RESTING AT L1 · QUEUE MODEL"
        : "INVENTORY GUARD ACTIVE";
    statusElement.classList.toggle("is-paused", state.sessionExpired || !active);
    queueElement.textContent = quote ? `${formatAmount(Math.max(0, queue))} BTC` : "—";
    queueBar.style.width = `${queuePercent.toFixed(1)}%`;
    fillsElement.textContent = String(fills);
    lastElement.textContent = lastFill ? `@ ${priceFormatter.format(lastFill.price)}` : "—";
  }

  function renderPaperQuotes() {
    renderPaperQuoteSide("bid");
    renderPaperQuoteSide("ask");
    updatePaperSummary();
  }

  function updatePaperQuotes(metrics) {
    const paper = state.paper;
    const modelBid = Math.min(metrics.bestBid, Math.floor((metrics.microprice * 100) + 1e-7) / 100);
    const modelAsk = Math.max(metrics.bestAsk, Math.ceil((metrics.microprice * 100) - 1e-7) / 100);
    if (paper.bidQuote !== modelBid) {
      paper.bidQuote = modelBid;
      paper.bidQueueStart = paperQueueSeed(metrics.bestBidQuantity);
      paper.bidQueueAhead = paper.bidQueueStart;
    }
    if (paper.askQuote !== modelAsk) {
      paper.askQuote = modelAsk;
      paper.askQueueStart = paperQueueSeed(metrics.bestAskQuantity);
      paper.askQueueAhead = paper.askQueueStart;
    }
    renderPaperQuotes();
  }

  function recordPaperSnapshot(time, force = false) {
    const paper = state.paper;
    if (!state.currentMid || !state.currentMicroprice) return;
    paper.pnl = paper.cash + (paper.inventory * state.currentMid);
    updatePaperSummary();
    const sampleTime = Math.max(time, paper.lastHistoryAt + 1);
    if (!force && sampleTime - paper.lastHistoryAt < PAPER_HISTORY_INTERVAL_MS) return;

    paper.lastHistoryAt = sampleTime;
    paper.history.push({
      time: sampleTime,
      mid: state.currentMid,
      pnl: paper.pnl
    });
    if (paper.history.length > PAPER_HISTORY_LIMIT) paper.history.shift();
    schedulePaperChart();
  }

  function executePaperFill(side, time) {
    if (!paperSideIsActive(side)) return;
    const paper = state.paper;
    const price = side === "bid" ? paper.bidQuote : paper.askQuote;
    if (!price) return;

    const signedQuantity = side === "bid" ? SIMULATED_QUOTE_SIZE : -SIMULATED_QUOTE_SIZE;
    paper.inventory += signedQuantity;
    paper.cash -= signedQuantity * price;
    if (side === "bid") paper.bidFills += 1;
    else paper.askFills += 1;

    const fill = { side, price, quantity: SIMULATED_QUOTE_SIZE, time };
    paper.fills.unshift(fill);
    if (paper.fills.length > 120) paper.fills.pop();

    const displayedQuantity = side === "bid" ? state.bids[0]?.[1] : state.asks[0]?.[1];
    const refreshedQueue = paperQueueSeed(displayedQuantity);
    if (side === "bid") {
      paper.bidQueueStart = refreshedQueue;
      paper.bidQueueAhead = refreshedQueue;
    } else {
      paper.askQueueStart = refreshedQueue;
      paper.askQueueAhead = refreshedQueue;
    }

    capturePaperMarkout(fill);
    recordPaperSnapshot(time, true);
    renderPaperQuotes();
    schedulePaperChart();
  }

  function processPaperTrade(trade) {
    const paper = state.paper;
    let queueChanged = false;

    if (trade.isSell && paper.bidQuote && paperSideIsActive("bid") && trade.price <= paper.bidQuote + 0.005) {
      paper.bidQueueAhead -= trade.quantity;
      queueChanged = true;
      if (paper.bidQueueAhead <= 0) executePaperFill("bid", trade.time);
    }

    if (!trade.isSell && paper.askQuote && paperSideIsActive("ask") && trade.price >= paper.askQuote - 0.005) {
      paper.askQueueAhead -= trade.quantity;
      queueChanged = true;
      if (paper.askQueueAhead <= 0) executePaperFill("ask", trade.time);
    }

    if (queueChanged) renderPaperQuotes();
  }

  function schedulePaperChart() {
    if (state.paperChartRenderQueued) return;
    state.paperChartRenderQueued = true;
    window.requestAnimationFrame(() => {
      state.paperChartRenderQueued = false;
      drawPaperChart();
    });
  }

  function prepareCanvas(canvas) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 80 || rect.height < 70) return null;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    const targetWidth = Math.round(width * ratio);
    const targetHeight = Math.round(height * ratio);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    return { context, width, height };
  }

  function drawPaperChart() {
    const prepared = prepareCanvas(elements.paperChart);
    if (!prepared) return;
    const { context, width, height } = prepared;
    const history = state.paper.history;
    const padding = { top: 20, right: 18, bottom: 30, left: 66 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    context.font = '11.5px "SFMono-Regular", Consolas, monospace';
    context.textBaseline = "middle";
    if (history.length < 2) {
      context.fillStyle = "rgba(148, 163, 184, 0.62)";
      context.textAlign = "center";
      context.fillText("COLLECTING LIVE PAPER HISTORY…", width / 2, height / 2);
      return;
    }

    const firstTime = history[0].time;
    const lastTime = history[history.length - 1].time;
    const timeRange = Math.max(lastTime - firstTime, 1);
    const x = (time) => padding.left + ((time - firstTime) / timeRange) * chartWidth;

    function drawGrid(minValue, maxValue, formatter) {
      for (let index = 0; index <= 3; index += 1) {
        const ratio = index / 3;
        const lineY = padding.top + chartHeight - (ratio * chartHeight);
        const value = minValue + ((maxValue - minValue) * ratio);
        context.strokeStyle = "rgba(148, 163, 184, 0.11)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(padding.left, lineY);
        context.lineTo(width - padding.right, lineY);
        context.stroke();
        context.fillStyle = "rgba(148, 163, 184, 0.58)";
        context.textAlign = "right";
        context.fillText(formatter(value), padding.left - 7, lineY);
      }
    }

    function drawTimeLabels() {
      [0, 0.5, 1].forEach((ratio, index) => {
        const time = firstTime + (timeRange * ratio);
        context.fillStyle = "rgba(148, 163, 184, 0.55)";
        context.textAlign = index === 0 ? "left" : index === 2 ? "right" : "center";
        context.fillText(timeFormatter.format(new Date(time)), padding.left + (chartWidth * ratio), height - 10);
      });
    }

    function drawLine(accessor, y, color, dashed = false) {
      context.beginPath();
      history.forEach((point, index) => {
        const pointX = x(point.time);
        const pointY = y(accessor(point));
        if (index === 0) context.moveTo(pointX, pointY);
        else context.lineTo(pointX, pointY);
      });
      if (dashed) context.setLineDash([4, 4]);
      context.strokeStyle = color;
      context.lineWidth = 1.6;
      context.stroke();
      context.setLineDash([]);
    }

    if (state.paper.chartMode === "pnl") {
      const pnlValues = history.map((point) => point.pnl);
      const rawMin = Math.min(0, ...pnlValues);
      const rawMax = Math.max(0, ...pnlValues);
      const pad = Math.max(0.00005, (rawMax - rawMin) * 0.18);
      const minValue = rawMin - pad;
      const maxValue = rawMax + pad;
      const y = (value) => padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      const zeroY = y(0);
      const positive = history[history.length - 1].pnl >= 0;
      const lineColor = positive ? "#00d99b" : "#ff506f";

      const pnlGridDecimals = Math.abs(maxValue - minValue) < 0.1 ? 5 : Math.abs(maxValue - minValue) < 10 ? 3 : 2;
      drawGrid(minValue, maxValue, (value) => value.toFixed(pnlGridDecimals));
      context.setLineDash([3, 4]);
      context.strokeStyle = "rgba(210, 218, 230, 0.38)";
      context.beginPath();
      context.moveTo(padding.left, zeroY);
      context.lineTo(width - padding.right, zeroY);
      context.stroke();
      context.setLineDash([]);

      const gradient = context.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
      gradient.addColorStop(0, positive ? "rgba(0, 217, 155, 0.18)" : "rgba(255, 80, 111, 0.04)");
      gradient.addColorStop(1, positive ? "rgba(0, 217, 155, 0.02)" : "rgba(255, 80, 111, 0.18)");
      context.beginPath();
      context.moveTo(x(history[0].time), zeroY);
      history.forEach((point) => context.lineTo(x(point.time), y(point.pnl)));
      context.lineTo(x(history[history.length - 1].time), zeroY);
      context.closePath();
      context.fillStyle = gradient;
      context.fill();
      drawLine((point) => point.pnl, y, lineColor);
      drawTimeLabels();
      elements.paperChart.setAttribute("aria-label", `Paper trading P and L curve. Current simulated P and L ${state.paper.pnl.toFixed(2)} USDT.`);
      return;
    }

    const visibleFills = state.paper.fills.filter((fill) => fill.time >= firstTime && fill.time <= lastTime);
    const priceValues = history.map((point) => point.mid);
    visibleFills.forEach((fill) => priceValues.push(fill.price));
    const rawMin = Math.min(...priceValues);
    const rawMax = Math.max(...priceValues);
    const pricePad = Math.max(0.1, (rawMax - rawMin) * 0.18);
    const minPrice = rawMin - pricePad;
    const maxPrice = rawMax + pricePad;
    const y = (value) => padding.top + chartHeight - ((value - minPrice) / (maxPrice - minPrice)) * chartHeight;

    drawGrid(minPrice, maxPrice, (value) => priceFormatter.format(value));
    drawLine((point) => point.mid, y, "rgba(190, 201, 217, 0.86)");

    visibleFills.forEach((fill) => {
      const fillX = x(fill.time);
      const fillY = y(fill.price);
      const isBid = fill.side === "bid";
      context.beginPath();
      if (isBid) {
        context.moveTo(fillX, fillY - 7);
        context.lineTo(fillX - 5, fillY + 3);
        context.lineTo(fillX + 5, fillY + 3);
      } else {
        context.moveTo(fillX, fillY + 7);
        context.lineTo(fillX - 5, fillY - 3);
        context.lineTo(fillX + 5, fillY - 3);
      }
      context.closePath();
      context.fillStyle = isBid ? "#00d99b" : "#ff506f";
      context.fill();
    });

    context.font = '600 11.5px "SFMono-Regular", Consolas, monospace';
    context.textAlign = "left";
    context.fillStyle = "rgba(190, 201, 217, 0.86)";
    context.fillText("MID", padding.left + 4, 8);
    context.fillStyle = "#00d99b";
    context.fillText("▲ BID FILL", padding.left + 55, 8);
    context.fillStyle = "#ff506f";
    context.fillText("▼ ASK FILL", padding.left + 145, 8);
    drawTimeLabels();
    elements.paperChart.setAttribute("aria-label", `Paper fill chart with ${state.paper.bidFills} simulated bid fills and ${state.paper.askFills} simulated ask fills.`);
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

    const compactHeight = displayHeight < 190;
    const padding = compactHeight
      ? { top: 44, right: 18, bottom: 30, left: 62 }
      : { top: 50, right: 24, bottom: 38, left: 70 };
    const chartWidth = displayWidth - padding.left - padding.right;
    const chartHeight = displayHeight - padding.top - padding.bottom;
    const minPrice = bidDepth[bidDepth.length - 1].price;
    const maxPrice = askDepth[askDepth.length - 1].price;
    const maxQuantity = Math.max(bidDepth[bidDepth.length - 1].total, askDepth[askDepth.length - 1].total, 0.0001);
    const bestBid = bidDepth[0].price;
    const bestAsk = askDepth[0].price;
    const mid = (bestBid + bestAsk) / 2;
    const centerX = padding.left + (chartWidth / 2);
    const centerGap = Math.max(58, Math.min(110, chartWidth * 0.13));
    const bidEdge = centerX - (centerGap / 2);
    const askEdge = centerX + (centerGap / 2);
    const bidRange = Math.max(bestBid - minPrice, 0.01);
    const askRange = Math.max(maxPrice - bestAsk, 0.01);
    const bidX = (price) => padding.left + ((price - minPrice) / bidRange) * (bidEdge - padding.left);
    const askX = (price) => askEdge + ((price - bestAsk) / askRange) * ((displayWidth - padding.right) - askEdge);
    const y = (quantity) => padding.top + chartHeight - (quantity / maxQuantity) * chartHeight;
    const baseline = padding.top + chartHeight;

    context.lineWidth = 1;
    context.font = `${compactHeight ? 11.5 : 13.5}px "SFMono-Regular", Consolas, monospace`;
    context.textBaseline = "middle";
    const verticalTickCount = chartHeight < 70 ? 1 : chartHeight < 130 ? 2 : 4;
    for (let index = 0; index <= verticalTickCount; index += 1) {
      const quantity = (maxQuantity / verticalTickCount) * index;
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

    context.fillStyle = "rgba(148, 163, 184, 0.035)";
    context.fillRect(bidEdge, padding.top, centerGap, chartHeight);

    function drawStep(points, xScale, stroke, fill) {
      const ordered = points;
      context.beginPath();
      context.moveTo(xScale(ordered[0].price), baseline);
      context.lineTo(xScale(ordered[0].price), y(ordered[0].total));
      for (let index = 1; index < ordered.length; index += 1) {
        context.lineTo(xScale(ordered[index].price), y(ordered[index - 1].total));
        context.lineTo(xScale(ordered[index].price), y(ordered[index].total));
      }
      context.lineTo(xScale(ordered[ordered.length - 1].price), baseline);
      context.closePath();
      context.fillStyle = fill;
      context.fill();

      context.beginPath();
      context.moveTo(xScale(ordered[0].price), y(ordered[0].total));
      for (let index = 1; index < ordered.length; index += 1) {
        context.lineTo(xScale(ordered[index].price), y(ordered[index - 1].total));
        context.lineTo(xScale(ordered[index].price), y(ordered[index].total));
      }
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.stroke();
    }

    drawStep([...bidDepth].reverse(), bidX, "#00d99b", "rgba(0, 217, 155, 0.16)");
    drawStep(askDepth, askX, "#ff506f", "rgba(255, 80, 111, 0.16)");

    function drawReference(lineX, color) {
      context.setLineDash([3, 4]);
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(lineX, padding.top);
      context.lineTo(lineX, baseline);
      context.stroke();
      context.setLineDash([]);
    }

    drawReference(bidEdge, "#00d99b");
    drawReference(askEdge, "#ff506f");

    context.setLineDash([2, 5]);
    context.strokeStyle = "rgba(169, 178, 193, 0.42)";
    context.beginPath();
    context.moveTo(centerX, padding.top);
    context.lineTo(centerX, baseline);
    context.stroke();
    context.setLineDash([]);

    context.font = `600 ${compactHeight ? 11.5 : 13.5}px "SFMono-Regular", Consolas, monospace`;
    context.fillStyle = "rgba(210, 218, 230, 0.86)";
    context.textAlign = "center";
    context.fillText(`MID ${priceFormatter.format(mid)}`, centerX, 13);

    context.fillStyle = "#00d99b";
    context.textAlign = "right";
    context.fillText(`BID ${priceFormatter.format(bestBid)}`, bidEdge - 9, 32);
    context.fillStyle = "#ff506f";
    context.textAlign = "left";
    context.fillText(`ASK ${priceFormatter.format(bestAsk)}`, askEdge + 9, 32);

    context.font = `${compactHeight ? 10.5 : 12.5}px "SFMono-Regular", Consolas, monospace`;
    context.fillStyle = "rgba(148, 163, 184, 0.62)";
    context.textAlign = "left";
    context.fillText(priceFormatter.format(minPrice), padding.left, baseline + 18);
    context.textAlign = "right";
    context.fillText(priceFormatter.format(bestBid), bidEdge - 7, baseline + 18);
    context.textAlign = "left";
    context.fillText(priceFormatter.format(bestAsk), askEdge + 7, baseline + 18);
    context.textAlign = "right";
    context.fillText(priceFormatter.format(maxPrice), displayWidth - padding.right, baseline + 18);

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
    processPaperTrade({ price, quantity, isSell, time: tradeTime });
    scheduleTradeRender();
  }

  function capturePaperMarkout(fill) {
    if (!state.currentMid) return;
    const direction = fill.side === "bid" ? 1 : -1;

    [[1000, state.markouts1s, elements.markout1s], [5000, state.markouts5s, elements.markout5s]]
      .forEach(([horizon, samples, element]) => {
        const timer = window.setTimeout(() => {
          state.markoutTimers.delete(timer);
          if (!state.currentMid || state.destroyed) return;
          const markout = direction * ((state.currentMid - fill.price) / fill.price) * 10000;
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
      elements.body.classList.remove("is-connecting", "is-live", "is-stale", "is-offline", "is-paused");
      elements.body.classList.add(`is-${status}`);
      elements.connectionLabel.textContent = status === "live" ? "LIVE" : status === "paused" ? "PAUSED" : status.toUpperCase();
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
    state.retryCount = 0;
    noteMessage(data.E || data.T);

    if (stream.includes("@depth20") || data.lastUpdateId) updateDepth(data);
    if (stream.includes("@aggTrade") || data.e === "aggTrade") updateLastTrade(data);
    if (stream.includes("@ticker") || data.e === "24hrTicker") updateTicker(data);
  }

  function scheduleReconnect() {
    if (state.destroyed || state.sessionExpired || state.suspended || state.reconnectTimer) return;
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
    if (state.destroyed || state.sessionExpired || state.suspended || document.hidden) return;
    if (Date.now() >= state.sessionDeadline) {
      expireLiveSession();
      return;
    }
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
  }

  function clearReconnectTimer() {
    window.clearTimeout(state.reconnectTimer);
    state.reconnectTimer = null;
  }

  function closeSocket(reason) {
    const socket = state.socket;
    state.socket = null;
    if (!socket || socket.readyState >= WebSocket.CLOSING) return;
    try {
      socket.close(1000, reason);
    } catch {
      socket.close();
    }
  }

  function suspendLiveSession() {
    if (state.destroyed || state.sessionExpired) return;
    state.suspended = true;
    clearReconnectTimer();
    closeSocket("Page inactive");
    setConnection("paused", "TAB INACTIVE");
  }

  function resumeLiveSession() {
    if (state.destroyed || state.sessionExpired) return;
    if (Date.now() >= state.sessionDeadline) {
      expireLiveSession();
      return;
    }
    state.suspended = false;
    if (!state.socket || state.socket.readyState === WebSocket.CLOSED) connect();
  }

  function expireLiveSession() {
    if (state.destroyed || state.sessionExpired) return;
    state.sessionExpired = true;
    state.suspended = true;
    state.sessionTimer = null;
    clearReconnectTimer();
    window.clearTimeout(state.tradeRenderTimer);
    state.tradeRenderTimer = null;
    state.pendingTrade = null;
    window.clearInterval(state.staleTimer);
    state.staleTimer = null;
    state.markoutTimers.forEach((timer) => window.clearTimeout(timer));
    state.markoutTimers.clear();
    closeSocket("Five minute limit");
    elements.paperBidStatus.textContent = "SESSION PAUSED";
    elements.paperAskStatus.textContent = "SESSION PAUSED";
    elements.paperBidStatus.classList.add("is-paused");
    elements.paperAskStatus.classList.add("is-paused");
    setConnection("paused", "5 MIN LIMIT");
  }

  function destroy() {
    if (state.destroyed) return;
    state.destroyed = true;
    state.suspended = true;
    window.clearTimeout(state.sessionTimer);
    clearReconnectTimer();
    window.clearTimeout(state.tradeRenderTimer);
    window.clearTimeout(resizeTimer);
    window.clearInterval(state.staleTimer);
    state.markoutTimers.forEach((timer) => window.clearTimeout(timer));
    state.markoutTimers.clear();
    if (state.depthChartObserver) state.depthChartObserver.disconnect();
    if (state.paperChartObserver) state.paperChartObserver.disconnect();
    closeSocket("Page closed");
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resetRows();
      scheduleDepthChart();
      schedulePaperChart();
    }, 120);
  });
  window.addEventListener("beforeunload", destroy, { once: true });
  window.addEventListener("pagehide", destroy, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) suspendLiveSession();
    else resumeLiveSession();
  });

  elements.paperChartTabs.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.paperChart;
      if (mode !== "fills" && mode !== "pnl") return;
      state.paper.chartMode = mode;
      elements.paperChartTabs.forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      elements.paperChartTitle.textContent = mode === "fills" ? "MID PRICE & FILLS" : "P&L CURVE";
      schedulePaperChart();
    });
  });

  resetRows();
  if ("ResizeObserver" in window && elements.depthChart) {
    state.depthChartObserver = new ResizeObserver(scheduleDepthChart);
    state.depthChartObserver.observe(elements.depthChart);
  }
  if ("ResizeObserver" in window && elements.paperChart) {
    state.paperChartObserver = new ResizeObserver(schedulePaperChart);
    state.paperChartObserver.observe(elements.paperChart);
  }
  renderPaperQuotes();
  watchForStaleData();
  state.sessionTimer = window.setTimeout(expireLiveSession, LIVE_SESSION_LIMIT_MS);
  if (document.hidden) suspendLiveSession();
  else connect();
})();
