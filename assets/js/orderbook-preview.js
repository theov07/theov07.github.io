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
    connectionLabel: document.getElementById("connection-label"),
    latencyLabel: document.getElementById("latency-label"),
    tradeTape: document.getElementById("trade-tape")
  };

  const state = {
    bids: [],
    asks: [],
    trades: [],
    lastTradePrice: null,
    lastMessageAt: 0,
    lastStatusAt: 0,
    connectionStatus: "",
    endpointIndex: 0,
    retryCount: 0,
    reconnectTimer: null,
    staleTimer: null,
    tradeRenderTimer: null,
    pendingTrade: null,
    socket: null,
    destroyed: false,
    bookDirty: false,
    renderQueued: false
  };

  function levelCount() {
    if (window.innerWidth <= 780) return window.innerHeight < 720 ? 5 : 7;
    if (window.innerHeight < 700) return 9;
    return 14;
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
    elements.spreadValue.textContent = `${priceFormatter.format(spread)} USDT`;
    elements.spreadBps.textContent = `${spreadBps.toFixed(2)} BPS`;
    elements.midPrice.textContent = priceFormatter.format(mid);

    const bidLiquidity = state.bids.slice(0, 10).reduce((sum, [, quantity]) => sum + quantity, 0);
    const askLiquidity = state.asks.slice(0, 10).reduce((sum, [, quantity]) => sum + quantity, 0);
    const denominator = bidLiquidity + askLiquidity;
    const imbalance = denominator ? ((bidLiquidity - askLiquidity) / denominator) * 100 : 0;
    elements.imbalance.textContent = `${imbalance >= 0 ? "+" : ""}${imbalance.toFixed(1)}%`;
    elements.imbalance.style.color = imbalance >= 0 ? "var(--bid)" : "var(--ask)";
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
    state.pendingTrade = { price, quantity, isSell, time: Number(data.T) || Date.now() };
    state.trades.unshift({ price, quantity, isSell });
    state.trades = state.trades.slice(0, 14);
    scheduleTradeRender();
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
  }

  function destroy() {
    state.destroyed = true;
    window.clearTimeout(state.reconnectTimer);
    window.clearTimeout(state.tradeRenderTimer);
    window.clearInterval(state.staleTimer);
    if (state.socket) state.socket.close();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resetRows, 120);
  });
  window.addEventListener("beforeunload", destroy, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (!state.socket || state.socket.readyState === WebSocket.CLOSED)) connect();
  });

  resetRows();
  watchForStaleData();
  connect();
})();
