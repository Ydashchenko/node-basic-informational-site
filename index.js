const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Get the URL and parse it
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Get the path from the URL
  const { pathname } = parsedUrl;

  // Map URLs to corresponding HTML files
  let filePath = '.' + pathname + '.html';

  // Handle the case when no path is provided (localhost:8080)
  if (pathname === '/') {
    filePath = './index.html';
  }

  // Check if the requested file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, serve the 404 page
      fs.readFile('./404.html', (err, notFoundData) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('500 Internal Server Error');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundData);
        }
      });
    } else {
      // File exists, serve it
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('500 Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    }
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
