const { validationResult } = require('express-validator');
const { dbQueryErrorHandler } = require('../utils/errorHandler');
const LoginHandler = require('../utils/LoginHandler');
const pool = require('../config/db.config');

module.exports = async (req, res) => {
  // validate request data

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // register new community in database

  const { email, password } = req.body;

  const userExists = await pool.query(
    'SELECT email FROM auth WHERE email=$1 AND password=$2',
    [email, password],
    (err, result) => {
      if (err || result.rowCount > 1) return dbQueryErrorHandler(err);
      if (result.rowCount === 0) {
        return {
          error: () => res.status(404).send('Invalid email or password. Ensure you are signed up and your password tallies with your email')
        };
      }
    }
  );

  if (userExists && userExists.error) return userExists.error();

  // log user in

  pool.query(
    'SELECT * FROM trainers, teachers WHERE email=$1',
    [email],
    (err, result) => {
      if (err || result.rowCount > 1) return dbQueryErrorHandler(err);

      if (result.rowCount === 1) {
        const user = result.rows[0];

        user.userType = 'institute_id' in Object.keys(user)
          ? 'trainer' : 'teacher';

        const loginHandler = new LoginHandler(user);

        return loginHandler.successResponse(res);
      }
    }
  );
};
