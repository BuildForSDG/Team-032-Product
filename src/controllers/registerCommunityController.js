const { validationResult } = require('express-validator');
const { dbQueryErrorHandler } = require('../utils/errorHandler');
const pool = require('../config/db.config');

module.exports = async (req, res) => {
  // validate request data

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // register new community in database

  const {
    name,
    town,
    lga,
    state,
    country,
    totalPopulation,
    childrenPopulation,
    youthPopulation,
    middleAgedPopulation,
    elderlyPopulation
  } = req.body;

  pool.query(
    `INSERT INTO public.communities(
    name, town, lga, state, country, total_population,
    children_population, youth_population, middle_aged_population, elderly_population
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      name,
      town,
      lga,
      state,
      country,
      totalPopulation,
      childrenPopulation || null,
      youthPopulation || null,
      middleAgedPopulation || null,
      elderlyPopulation || null
    ],
    (err, result) => {
      // respond for error

      if (err) {
        return dbQueryErrorHandler(err).error(res);
      }

      // respond for created data

      const message = result.rowCount > 0
        ? `No. of records created: ${result.rowCount}`
        : 'No records were created';

      return res.send({
        message,
        data: req.body
      });
    }
  );
};
