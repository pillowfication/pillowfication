const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const port = +process.argv[2] || 80;

app.use(compression());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/bundle.js'));
});
app.get('/bundle.js.gz', (req, res) => {
  res.set('Content-Encoding', 'gzip');
  res.sendFile(path.join(__dirname, '../website/bundle.js.gz'));
});
// app.get('/bundle.js.map', (req, res) => {
//   res.sendFile(path.join(__dirname, '../website/bundle.js.map'));
// });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
