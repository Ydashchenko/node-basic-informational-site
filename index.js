const express = require('express');
const app = express();
const port = 8080;

// Serve static files from a directory named 'public'
app.use(express.static('public'));

// Define routes for each page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/contact-me', (req, res) => {
  res.sendFile(__dirname + '/contact-me.html');
});

// 404 - Page not found
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
