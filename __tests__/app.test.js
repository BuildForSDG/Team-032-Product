/* eslint-disable no-console */

const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../src/server');

dotenv.config();

const uri = '/api/v1';

describe('Server', () => {
  afterEach((done) => {
    console.log('\x1b[42m\x1b[30m', 'Finished API avalability tests\x1b[0m\n');
    app.close();
    done();
  });

  it('it exists', async () => {
    expect(await app).toBeDefined();
  });

  it('it returns program name with SDGs', async () => {
    const res = await request(app).get(uri);
    const sdgPos = (res.text || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });
});
