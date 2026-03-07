#!/usr/bin/env node
// LOCATE1 Dashboard — serves the trilateration visualization
// Usage: node dashboard.cjs [--port 3012]

const http = require('http')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const portIdx = args.indexOf('--port')
const PORT = portIdx >= 0 ? parseInt(args[portIdx + 1]) : 3012

const indexPath = path.join(__dirname, 'index.html')
const feedPath = path.join(__dirname, 'dashboard.html')
const mapPath = path.join(__dirname, 'map.html')

http.createServer((req, res) => {
  const file = req.url === '/feed' ? feedPath : req.url === '/map' ? mapPath : indexPath
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(fs.readFileSync(file, 'utf8'))
}).listen(PORT, () => {
  console.log(`LOCATE1 Dashboard: http://localhost:${PORT}`)
})
