const { body } = require('express-validator');

module.exports = [
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a user email')
    .isEmail()
    .withMessage('Input correct email address')
    .normalizeEmail({ all_lowercase: true }),
  body('password')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a user password')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/)
    .withMessage('Password must not be between 8 and 24 characters long, with at least a lower case, upper case, and number character')
    .escape()
];
