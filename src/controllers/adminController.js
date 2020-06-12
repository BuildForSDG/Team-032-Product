const { validationResult } = require('express-validator');
// const { dbQueryErrorHandler } = require('../utils/errorHandler');
const LoginHandler = require('../utils/loginHandler');
const pool = require('../config/db.config');

module.exports = (req, res) => {
  // validate request data

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check username and password. I noticed password stored is not hashed. It should be hashed.

  const { email, password } = req.body;

  pool.query('SELECT email FROM auth WHERE email=$1 AND password=$2', [email, password], (err, result) => {
    // check for errors with querying?
    if (!err) {
      // check that user record was returned
      if (result.rowCount !== 0) {
        // user exists
        // check if user is admin
        pool.query('SELECT * FROM admin WHERE email=$1', [email], (err2, result2) => {
          // check for errors with querying?
          if (!err2) {
            // check that user record was returned
            if (result2.rowCount !== 0) {
              // User is confirmed as admin
              // Log her in
              const user = result2.rows[0];
              user.userType = 'admin';
              const loginHandler = new LoginHandler(user);
              return loginHandler.successResponse(res);
            }
            return res.status(401).json({ error: { status: 401, message: 'Hey!! You are NOT an admin.' } });
          }
          return res.status(503).json({ error: { status: 503, message: `User logged in but could not query DB for admin status due to: ${err2.message}`, stack: err2.stack } });
        });
      } else {
        return res.status(401).json({ error: { status: 401, message: 'Invalid email or password. Sign-up or reset password' } });
      }
    } else {
      return res.status(503).json({ error: { status: 503, message: `Could not query DB for user details due to: ${err.message}`, stack: err.stack } });
    }
  });
};
