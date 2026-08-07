(function () {
  "use strict";

  var STREAM_PATH = "btcusdt@depth20@100ms/btcusdt@aggTrade/btcusdt@ticker";
  var STREAM_ENDPOINTS = [
    "wss://data-stream.binance.vision/stream?streams=" + STREAM_PATH,
    "wss://stream.binance.com:9443/stream?streams=" + STREAM_PATH,
    "wss://stream.binance.com:443/stream?streams=" + STREAM_PATH
  ];
  var SESSION_LIMIT_MS = 10 * 60 * 1000;
  var FLOW_WINDOW_MS = 5000;
  var MAX_RECONNECT_MS = 12000;

  var socket = null;
  var endpointIndex = 0;
  var reconnectAttempt = 0;
  var reconnectTimer = null;
  var renderFrame = null;
  var countdownTimer = null;
  var destroyed = false;
  var sessionEnded = false;
  var deadline = Date.now() + SESSION_LIMIT_MS;

  var state = {
    bids: [],
    asks: [],
    price: null,
    change: null,
    high: null,
    low: null,
    volume: null,
    eventTime: null,
    trades: []
  };

  function nodes(name) {
    return document.querySelectorAll('[data-qm="' + name + '"]');
  }

  function write(name, value, tone) {
    nodes(name).forEach(function (node) {
      node.textContent = value;
      if (tone) node.setAttribute("data-tone", tone);
      else node.removeAttribute("data-tone");
    });
  }

  function setStatus(label, online) {
    write("status", label, online ? "bid" : "ask");
    document.querySelectorAll(".ql-status-dot").forEach(function (dot) {
      dot.classList.toggle("is-offline", !online);
    });
  }

  function number(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function price(value) {
    if (!Number.isFinite(value)) return "—";
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function compact(value, suffix) {
    if (!Number.isFinite(value)) return "—";
    var absolute = Math.abs(value);
    var scaled = value;
    var unit = "";
    if (absolute >= 1e9) { scaled = value / 1e9; unit = "B"; }
    else if (absolute >= 1e6) { scaled = value / 1e6; unit = "M"; }
    else if (absolute >= 1e3) { scaled = value / 1e3; unit = "K"; }
    return scaled.toFixed(absolute >= 1e6 ? 2 : 3) + unit + (suffix || "");
  }

  function sumLevels(levels, count) {
    return levels.slice(0, count).reduce(function (total, level) { return total + level[1]; }, 0);
  }

  function scheduleRender() {
    if (renderFrame) return;
    renderFrame = window.requestAnimationFrame(function () {
      renderFrame = null;
      render();
    });
  }

  function render() {
    var bestBid = state.bids.length ? state.bids[0][0] : null;
    var bestAsk = state.asks.length ? state.asks[0][0] : null;
    var bidQty = state.bids.length ? state.bids[0][1] : null;
    var askQty = state.asks.length ? state.asks[0][1] : null;
    var mid = Number.isFinite(bestBid) && Number.isFinite(bestAsk) ? (bestBid + bestAsk) / 2 : null;
    var spread = Number.isFinite(bestBid) && Number.isFinite(bestAsk) ? bestAsk - bestBid : null;
    var spreadBps = Number.isFinite(spread) && mid ? (spread / mid) * 10000 : null;
    var microprice = Number.isFinite(bestBid) && Number.isFinite(bestAsk) && bidQty + askQty > 0
      ? ((bestAsk * bidQty) + (bestBid * askQty)) / (bidQty + askQty)
      : null;
    var bidDepth = sumLevels(state.bids, 10);
    var askDepth = sumLevels(state.asks, 10);
    var depthTotal = bidDepth + askDepth;
    var imbalance = depthTotal > 0 ? ((bidDepth - askDepth) / depthTotal) * 100 : null;
    var now = Date.now();

    state.trades = state.trades.filter(function (trade) { return now - trade.time <= FLOW_WINDOW_MS; });
    var buyFlow = state.trades.reduce(function (total, trade) { return total + (trade.side === "buy" ? trade.quantity : 0); }, 0);
    var sellFlow = state.trades.reduce(function (total, trade) { return total + (trade.side === "sell" ? trade.quantity : 0); }, 0);
    var netFlow = buyFlow - sellFlow;

    write("price", price(state.price), state.price && mid ? (state.price >= mid ? "bid" : "ask") : null);
    write("mid", price(mid));
    write("spread", Number.isFinite(spread) ? spread.toFixed(2) + " USDT" : "—");
    write("spread-bps", Number.isFinite(spreadBps) ? spreadBps.toFixed(2) + " BPS" : "—");
    write("microprice", price(microprice), microprice && mid ? (microprice >= mid ? "bid" : "ask") : null);
    write("bid", price(bestBid), "bid");
    write("ask", price(bestAsk), "ask");
    write("imbalance", Number.isFinite(imbalance) ? (imbalance >= 0 ? "+" : "") + imbalance.toFixed(1) + "%" : "—", imbalance >= 0 ? "bid" : "ask");
    write("change", Number.isFinite(state.change) ? (state.change >= 0 ? "+" : "") + state.change.toFixed(2) + "%" : "—", state.change >= 0 ? "bid" : "ask");
    write("high", price(state.high));
    write("low", price(state.low));
    write("volume", compact(state.volume, " USDT"));
    write("buy-flow", compact(buyFlow, " BTC"), "bid");
    write("sell-flow", compact(sellFlow, " BTC"), "ask");
    write("net-flow", (netFlow >= 0 ? "+" : "") + compact(netFlow, " BTC"), netFlow >= 0 ? "bid" : "ask");
    write("bid-depth", compact(bidDepth, " BTC"), "bid");
    write("ask-depth", compact(askDepth, " BTC"), "ask");

    if (state.eventTime) write("latency", Math.max(0, now - state.eventTime) + " MS");

    var bidWidth = depthTotal ? Math.max(8, (bidDepth / depthTotal) * 100) : 50;
    var askWidth = depthTotal ? Math.max(8, (askDepth / depthTotal) * 100) : 50;
    document.querySelectorAll('[data-depth="bid"]').forEach(function (node) { node.style.width = bidWidth + "%"; });
    document.querySelectorAll('[data-depth="ask"]').forEach(function (node) { node.style.width = askWidth + "%"; });
  }

  function ingest(payload) {
    var data = payload && payload.data ? payload.data : payload;
    if (!data) return;
    state.eventTime = number(data.E) || Date.now();

    if (Array.isArray(data.bids) && Array.isArray(data.asks)) {
      state.bids = data.bids.map(function (level) { return [number(level[0]), number(level[1])]; }).filter(function (level) { return level[0] && level[1] !== null; });
      state.asks = data.asks.map(function (level) { return [number(level[0]), number(level[1])]; }).filter(function (level) { return level[0] && level[1] !== null; });
    } else if (data.e === "aggTrade") {
      state.price = number(data.p);
      state.trades.push({
        time: number(data.T) || Date.now(),
        quantity: number(data.q) || 0,
        side: data.m ? "sell" : "buy"
      });
    } else if (data.e === "24hrTicker") {
      state.price = state.price || number(data.c);
      state.change = number(data.P);
      state.high = number(data.h);
      state.low = number(data.l);
      state.volume = number(data.q);
    }
    scheduleRender();
  }

  function closeSocket() {
    if (!socket) return;
    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;
    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) socket.close(1000, "Market data session closed");
    socket = null;
  }

  function stopSession(label) {
    sessionEnded = true;
    window.clearTimeout(reconnectTimer);
    closeSocket();
    setStatus(label || "SESSION COMPLETE", false);
    write("session", "00:00", "ask");
    var note = document.querySelector("[data-session-note]");
    if (note) {
      note.querySelector("span:last-child").textContent = "Live display stopped after 10 min · refresh to start a new session";
      note.classList.add("is-visible");
    }
  }

  function scheduleReconnect() {
    if (destroyed || sessionEnded || document.hidden) return;
    var delay = Math.min(MAX_RECONNECT_MS, 700 * Math.pow(1.7, reconnectAttempt));
    reconnectAttempt += 1;
    window.clearTimeout(reconnectTimer);
    reconnectTimer = window.setTimeout(connect, delay);
  }

  function connect() {
    if (destroyed || sessionEnded || document.hidden || Date.now() >= deadline) return;
    closeSocket();
    setStatus("CONNECTING", true);

    try {
      socket = new WebSocket(STREAM_ENDPOINTS[endpointIndex]);
      socket.onopen = function () {
        reconnectAttempt = 0;
        setStatus("LIVE", true);
      };
      socket.onmessage = function (event) {
        try { ingest(JSON.parse(event.data)); } catch (_error) { /* Ignore malformed public packets. */ }
      };
      socket.onerror = function () {
        setStatus("RECONNECTING", false);
      };
      socket.onclose = function () {
        socket = null;
        if (!destroyed && !sessionEnded && !document.hidden) {
          endpointIndex = (endpointIndex + 1) % STREAM_ENDPOINTS.length;
          setStatus("RECONNECTING", false);
          scheduleReconnect();
        }
      };
    } catch (_error) {
      endpointIndex = (endpointIndex + 1) % STREAM_ENDPOINTS.length;
      scheduleReconnect();
    }
  }

  function tickSession() {
    var remaining = Math.max(0, deadline - Date.now());
    var minutes = Math.floor(remaining / 60000);
    var seconds = Math.floor((remaining % 60000) / 1000);
    write("session", String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0"));
    if (remaining <= 0 && !sessionEnded) stopSession("SESSION COMPLETE");
  }

  function destroy() {
    destroyed = true;
    window.clearTimeout(reconnectTimer);
    window.clearInterval(countdownTimer);
    closeSocket();
  }

  function initNavigation() {
    var toggle = document.querySelector(".ql-nav-toggle");
    var nav = document.querySelector(".ql-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initFilters() {
    var filters = document.querySelectorAll("[data-project-filter]");
    var cards = document.querySelectorAll("[data-project-category]");
    if (!filters.length || !cards.length) return;
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-project-filter");
        filters.forEach(function (item) { item.classList.toggle("is-active", item === button); });
        cards.forEach(function (card) {
          var categories = (card.getAttribute("data-project-category") || "").split(" ");
          card.hidden = filter !== "all" && categories.indexOf(filter) === -1;
        });
      });
    });
  }

  function init() {
    initNavigation();
    initFilters();
    tickSession();
    countdownTimer = window.setInterval(tickSession, 1000);
    connect();

    window.setTimeout(function () {
      var note = document.querySelector("[data-session-note]");
      if (note && !sessionEnded) note.classList.add("is-visible");
    }, 1200);
    window.setTimeout(function () {
      var note = document.querySelector("[data-session-note]");
      if (note && !sessionEnded) note.classList.remove("is-visible");
    }, 6200);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        closeSocket();
        if (!sessionEnded) setStatus("PAUSED", false);
      } else if (!destroyed && !sessionEnded && Date.now() < deadline) {
        connect();
      }
    });
    window.addEventListener("pagehide", destroy, { once: true });
    window.addEventListener("beforeunload", destroy, { once: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
