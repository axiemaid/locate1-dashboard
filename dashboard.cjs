#!/usr/bin/env node
// LOCATE1 Dashboard — serves the trilateration visualization
// Usage: node dashboard.cjs [--port 3012]

const http = require('http')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const portIdx = args.indexOf('--port')
const PORT = portIdx >= 0 ? parseInt(args[portIdx + 1]) : 3012

const htmlPath = path.join(__dirname, 'dashboard.html')

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(fs.readFileSync(htmlPath, 'utf8'))
}).listen(PORT, () => {
  console.log(`LOCATE1 Dashboard: http://localhost:${PORT}`)
})
