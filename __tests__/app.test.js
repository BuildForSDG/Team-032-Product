/* eslint-disable no-console */

const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db.config');

dotenv.config();

afterAll(async (done) => {
  pool.end(() => done());
});

describe('Server', () => {
  const uri = '/api/v1';

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('exists', async (done) => {
    expect(await app).toBeDefined();
    done();
  });

  it('returns program name with SDGs', async (done) => {
    const res = await request(app).get(uri);
    const sdgPos = (res.text || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
    done();
  });
});

describe('Community registration', () => {
  const uri = '/api/v1/communities/reg';

  const body = {
    name: 'Araromi Quaters',
    town: 'Oba Akoko',
    lga: 'Akoko South-West',
    state: 'Ondo',
    country: 'Nigeria',
    totalPopulation: 3859
    // childrenPopulation: null,
    // youthPopulation: null,
    // middleAgedPopulation: null,
    // elderlyPopulation: null
  };

  afterEach(async (done) => {
    await app.close();
    pool.query('DELETE FROM communities WHERE name=\'Araromi Quaters\'', () => done());
  });

  it('returns status 200', async (done) => {
    const res = await request(app).post(uri).send(body);
    expect(res.ok).toBe(true);
    done();
  });

  it('returns response data', async (done) => {
    const res = await request(app).post(uri).send(body);
    const responseData = res.body.data;
    expect(responseData).toBeTruthy();
    done();
  });
});

describe('Community registration', () => {
  const uri = '/api/v1/communities/reg';

  const body = {
    name: 'Araromi Quaters',
    town: 'Oba Akoko',
    lga: 'Akoko South-West',
    state: 'Ondo',
    country: 'Nigeria',
    totalPopulation: 3859,
    childrenPopulation: null,
    youthPopulation: null,
    middleAgedPopulation: null,
    elderlyPopulation: null
  };

  afterEach(async (done) => {
    await app.close();
    pool.query('DELETE FROM communities WHERE name=\'Araromi Quaters\'', () => done());
  });

  it('returns error status', async (done) => {
    const res = await request(app).post(uri).send(body);
    expect(res.status).toBe(422);
    done();
  });
});
