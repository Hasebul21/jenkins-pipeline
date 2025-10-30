const express = require('express');
const app = express();

app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.send('Hello world');
});

// POST /price
// expects JSON: { "a": 10, "b": 20 }
app.post('/price', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Inputs must be numbers' });
  }
  const sum = a + b;
  res.json({ sum });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}

module.exports = app; // exported for testing
