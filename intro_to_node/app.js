const express = require('express');
const app = express();
const morgan = require('morgan');

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.json(req.query); //do not send any data back to the client
});

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const c = parseInt(a) + parseInt(b);
  const result = `The sum of ${a} and ${b} is ${c}.`;

  res.send(result);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

