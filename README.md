# LOCATE1 Dashboard

Real-time positioning dashboard for the [LOCATE1](https://github.com/axiemaid/locate1) protocol. Reads attestations directly from the blockchain via the [LOCATE1 indexer](https://github.com/axiemaid/locate1-indexer) — no intermediate services, no derived data.

## What It Shows

- **Live attestation feed** — scrolling list of on-chain RSSI measurements as they arrive
- **Node positioning** — SVG trilateration from RSSI distances, computed client-side in the browser
- **Pair statistics** — average RSSI per node pair with dBm labels
- **Stale detection** — nodes without recent data flagged as stale

All data comes from the chain. The browser does the math.

## Run

```bash
node dashboard.cjs [--port 3012]
```

Serves `dashboard.html` on the specified port (default 3012).

## Configuration

The dashboard auto-detects the indexer:
- **Local:** `http://localhost:3011` (when accessed via localhost)
- **Remote:** `https://locate1.axiemaid.com` (when accessed via public URL)

Override by setting `window.INDEXER_URL` before the script runs.

## How It Works

1. **Seed** — fetches recent attestations from `GET /recent?limit=200`
2. **Live** — connects to the indexer's WebSocket for real-time push
3. **Trilaterate** — builds distance matrix from RSSI using log-distance model (`n=2.5`), places nodes via circle intersection + gradient descent
4. **Render** — SVG updated only when new data arrives (no render loop)

### Distance Model

```
distance = 10 ^ ((-10 - rssi) / (10 * 2.5))
```

`refRSSI = -10` (strongest signal = 1 unit), `n = 2.5` (indoor path-loss exponent). Output is proportional units, not meters. Trilateration only needs correct ratios.

## Dependencies

None. Zero npm packages. The server is a single `http.createServer` that serves one HTML file. The client is vanilla JS with no frameworks.

## Related

- [LOCATE1](https://github.com/axiemaid/locate1) — protocol spec
- [locate1-indexer](https://github.com/axiemaid/locate1-indexer) — blockchain indexer (REST + WebSocket API)
- [locate1-node](https://github.com/axiemaid/locate1-node) — ESP32 firmware + serial gateway

## License

MIT
