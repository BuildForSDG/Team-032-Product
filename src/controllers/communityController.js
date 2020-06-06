/* eslint-disable no-console */
import { validationResult } from 'express-validator';
import pool from '../config/db.config';

const registration = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check if record exixts
  //   let queryString = `SELECT * FROM public.communities
  //         WHERE name = '${req.body.name}'
  //         AND town = '${req.body.town}'
  //     `;

  // create a string object for Postgres SQL statement
  const queryString = `INSERT INTO public.communities(
    name, town, lga, state, country, 
    total_population, children_population, youth_population, middle_aged_population, elderly_population,
    date_created, date_modified
    ) VALUES(
        '${req.body.name}',
        '${req.body.town}',
        '${req.body.lga}',
        '${req.body.state}',
        '${req.body.country}',
        '${req.body.total_population}',
        '${req.body.children_population}',
        '${req.body.youth_population}',
        '${req.body.middle_aged_population}',
        '${req.body.elderly_population}',
        NOW(),
        NOW()
    )`;

  // console.log(queryString);

  pool.query(queryString, (err, result) => {
    if (err !== undefined) {
      // log the error to console
      console.log('Postgres INSERT error:', err);
      res.json({
        'Postgres INSERT error': err,
        data: req.body
      });

      // get the keys for the error
      //   const keys = Object.keys(err);
      //   console.log('\nkeys for Postgres error:', keys);

      // get the error position of SQL string
    //   console.log('Postgres error position:', err.position);
    }

    // check if the response is not 'undefined'
    if (result !== undefined) {
      // log the response to console
      console.log('Postgres response:', result);

      // get the keys for the response object
      //   const keys = Object.keys(res);

      // log the response keys to console
      //   console.log('\nkeys type:', typeof keys);
      //   console.log('keys for Postgres response:', keys);
      let message = '';
      if (result.rowCount > 0) {
        message = `# of records inserted:${result.rowCount}`;
        console.log(message);
      } else {
        message = 'No records were inserted.';
        console.log(message);
      }
      res.json({
        message,
        data: req.body
      });
    }
  });
};

export default registration;
