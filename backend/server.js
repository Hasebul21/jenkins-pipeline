const express = require('express');
const app = express();

app.use(express.json());

// Allow CORS for local frontend development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

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
