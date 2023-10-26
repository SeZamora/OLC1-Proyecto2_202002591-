const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  // Serve static files
  if (req.url.startsWith('/css/') || req.url.startsWith('/codemirror/') || req.url.startsWith('/js/') ) {
    const filePath = path.join(__dirname, req.url);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    return;
  }

  // Handle index page
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Pagina no encontrada');
        return;
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
    return;
  }

  // Handle other pages
  const pageName = req.url.slice(1);
  const filePath = path.join(__dirname, `${pageName}.html`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Pagina no encontrada');
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}/`);
});
