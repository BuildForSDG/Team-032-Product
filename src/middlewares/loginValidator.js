const { body } = require('express-validator');

module.exports = {
  adminLoginValidator: [
    body('email')
      .trim(' ')
      .notEmpty()
      .withMessage('Input an admin email')
      .isEmail()
      .withMessage('Input correct email address')
      .normalizeEmail(), // this strips periods from gmail.coms. this can be confusing later. see https://github.com/express-validator/express-validator/issues/644
    body('password')
      .trim(' ')
      .notEmpty()
      .withMessage('Input an admin password')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) // included requirement for special xter
      .withMessage('Password MUST be between 8 and 24 characters long, with at least a lower case, an upper case, a number , and special character')
      .escape()
  ]
};
