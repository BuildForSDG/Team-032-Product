/* eslint-disable no-console */

const dotenv = require('dotenv');
const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db.config');
const { generateToken } = require('../src/utils/tokenHandler');

dotenv.config();

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);

let server;

beforeAll((done) => {
  server = app
    .set('port', port)
    .listen(port, () => done());
});

// afterEach(async (done) => {
//   await server.close(() => done());
// });

afterAll((done) => {
  server.close(() => pool.end(() => done()));
});

describe('Server', () => {
  const uri = '/api/v1';

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
  describe('on minimal request', () => {
    const uri = '/api/v1/communities/reg';

    const body = {
      name: 'Araromi Quaters',
      town: 'Oba Akoko',
      lga: 'Akoko South-West',
      state: 'Ondo',
      country: 'Nigeria',
      totalPopulation: 3859
    };

    afterEach(async (done) => {
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


  describe('on empty input data', () => {
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
      pool.query('DELETE FROM communities WHERE name=\'Araromi Quaters\'', () => done());
    });

    it('returns error status', async (done) => {
      const res = await request(app).post(uri).send(body);
      expect(res.status).toBe(422);
      done();
    });
  });
});


describe('Teacher sign up', async () => {
  afterEach(async (done) => {
    await pool.query('DELETE FROM auth WHERE email=\'tobia807@gmail.com\';', () => done());
  });

  describe('Teacher email verification', () => {
    const uri = '/api/v1/users/teachers/sign-up';

    it('returns status 200', async (done) => {
      const levelOfEducationId = await pool.query(`INSERT INTO levels_of_education("name") values('Bachelors')
      ON CONFLICT("name") DO UPDATE
      SET "name"=levels_of_education."name" RETURNING id;`)
        .then((res) => {
          console.log(res.rows[0].id);
          return res.rows[0].id;
        }).catch((e) => console.log(e));
      const body = {
        email: 'tobia807@gmail.com',
        password: 'Pass1234!',
        phone: '+2348181105060',
        country: 'Nigeria',
        state: 'Osun',
        lga: 'Ede-South',
        town: 'Ede',
        level_of_education_id: levelOfEducationId
      };
      const res = await request(app).post(uri).send(body).catch(() => null);
      expect(res.status).toEqual(200);
      done();
    });
  });


  describe('Teacher account activation', () => {
    it('returns status 201', async (done) => {
      const levelOfEducationId = await pool.query(`INSERT INTO levels_of_education("name") values('Bachelors')
      ON CONFLICT("name") DO UPDATE
      SET "name"=levels_of_education."name" RETURNING id;`)
        .then((res) => {
          console.log(res.rows[0].id);
          return res.rows[0].id;
        }).catch((e) => console.log(e));
      const body = {
        email: 'tobia807@gmail.com',
        password: 'Pass1234!',
        phone: '+2348181105060',
        country: 'Nigeria',
        state: 'Osun',
        lga: 'Ede-South',
        town: 'Ede',
        level_of_education_id: levelOfEducationId
      };
      const token = generateToken({ data: body }, '9999 years');
      const uri = `/api/v1/users/teachers/create?token=${token}`;
      const res = await request(app).get(uri).send().catch(() => null);
      expect(res.status).toEqual(201);
      done();
    });
  });
});


describe('Trainer sign up', () => {
  afterEach((done) => {
    pool.query('DELETE FROM auth WHERE email=\'tobia807@gmail.com\'', () => done());
  });

  describe('Trainer email verification', () => {
    it('returns status 200', async (done) => {
      const instituteId = await pool.query(`INSERT INTO institutes("name", country, state, lga, address)
      values('Covenant University', 'Nigeria', 'Ogun', 'Sango', 'Km 10, Idiroko, Sango-Ota, Ogun state.')
      ON CONFLICT("name", country) DO UPDATE
      SET "name"=institutes."name", country=institutes.country RETURNING id;`)
        .then((res) => {
          console.log(res.rows[0].id);
          return res.rows[0].id;
        }).catch(() => null);
      const body = {
        email: 'tobia807@gmail.com',
        password: 'Pass1234!',
        phone: '+2348181105060',
        country: 'Nigeria',
        state: 'Ogun',
        lga: 'Ota',
        town: 'Sango-Ota',
        institute_id: instituteId
      };
      const uri = '/api/v1/users/trainers/sign-up';
      const res = await request(app).post(uri).send(body).catch(() => null);
      expect(res.status).toEqual(200);
      done();
    });
  });


  describe('Trainer account activation', () => {
    it('returns status 201', async (done) => {
      const instituteId = await pool.query(`INSERT INTO institutes("name", country, state, lga, address)
      values('Covenant University', 'Nigeria', 'Ogun', 'Sango', 'Km 10, Idiroko, Sango-Ota, Ogun state.')
      ON CONFLICT("name", country) DO UPDATE
      SET "name"=institutes."name", country=institutes.country RETURNING id;`)
        .then((res) => {
          console.log(res.rows[0].id);
          return res.rows[0].id;
        }).catch(() => null);
      const body = {
        email: 'tobia807@gmail.com',
        password: 'Pass1234!',
        phone: '+2348181105060',
        country: 'Nigeria',
        state: 'Ogun',
        lga: 'Ota',
        town: 'Sango-Ota',
        institute_id: instituteId
      };
      const token = generateToken({ data: body }, '9999 years');
      const uri = `/api/v1/users/trainers/create?token=${token}`;
      const res = await request(app).get(uri).send().catch(() => null);
      expect(res.status).toEqual(201);
      done();
    });
  });
});
