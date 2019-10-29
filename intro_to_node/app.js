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

//drill 1 /sum
app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const c = parseInt(a) + parseInt(b);
  const result = `The sum of ${a} and ${b} is ${c}.`;

  res.send(result);
});

//drill 2 /cipher  
app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);
  let result = '';
  for (i = 0; i < text.length; i++) {
    const charCodeAt = text.charCodeAt(i) + shift;
    const char = String.fromCharCode(charCodeAt);
    result = result + char;

  }
  res.send(result);
});

//drill 3 /lotto
app.get('/lotto', (req, res) => {
  const { numbers } = req.query.numbers;

  if (!numbers) {
    return res.send('numbers is required');
  }

  if (!Array.isArray(numbers)) {
    return res.send('numbers must be an array');
  }

  const guesses = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

  if (guesses.length !== 6) {
    return res.send('numbers must contain 6 integers between 1 and 20');
  }
});

//numbers to choose from, out of 20
const numberOptions = Array(20).fill(1).map((_, i) => i + 1);

//choose 6 randomly
const winningNumbers = [];
for (let i = 0; i < 6; i++) {
  const ran = Math.floor(Math.random() * numberOptions.length);
  winningNumbers.push(numberOptions[ran]);
  numberOptions.splice(ran, 1);
}

//compare winning number to guesses
let diff = winningNumbers.filter(n => !guesses.includes(n));

//create a response
let responseText;

switch (diff.length) {
case 0:
  responseText = 'Wow! Unbelievable! You could have won the mega millions!';
  break;
case 1:
  responseText = 'Congratulations! You win $100!';
  break;
case 2:
  responseText = 'Congratulations, you win a free ticket!';
  break;
default:
  responseText = 'Sorry, you lose';
}

res.send(responseText);
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

