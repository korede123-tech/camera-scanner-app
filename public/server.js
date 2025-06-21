const express = require('express');
const app = express();
const port = 3000;

console.log('🔥 server.js is running');

app.use(express.static('public'));

app.get('/test', (req, res) => {
  res.send('✅ Hello from the server');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
