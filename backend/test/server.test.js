const request = require('supertest');
const app = require('../server');

describe('Node.js API', () => {
  it('should return Hello world on GET /', async () => {
    const res = await request(app).get('/');
    if (res.statusCode !== 200 || res.text !== 'Hello world') throw new Error('Failed GET / test');
  });

  it('should return correct sum on POST /price', async () => {
    const res = await request(app)
      .post('/price')
      .send({ a: 5, b: 7 })
      .set('Content-Type', 'application/json');

    if (res.statusCode !== 200 || res.body.sum !== 12) throw new Error('Failed POST /price test');
  });
});
