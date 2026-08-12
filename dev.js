// Dev server. Node built-ins only — no install step, works offline.
const http = require('http'), fs = require('fs'), path = require('path');

const port = process.env.PORT || 8731;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
                '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
                '.webp': 'image/webp', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  // Keep requests inside the project directory.
  const file = path.join(__dirname, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(__dirname)) return res.writeHead(403).end('403');

  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end('Not found: ' + rel);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`dr.da labs → http://localhost:${port}`));
