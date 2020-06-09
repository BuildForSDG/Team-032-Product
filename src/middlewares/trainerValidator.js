const {
  body
} = require('express-validator');

module.exports.createTrainer = [
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
    .isLength({
      max: 24,
      min: 8
    })
    .withMessage('Password must be between 8 and 24 characters')
    .escape(),
  body('phone')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a phone number into the phone number field')
    .isMobilePhone('any', { strictMode: true })
    .withMessage('Input a standard phone number e.g +2348012345678')
    .escape(),
  body('country')
    .trim(' ')
    .notEmpty()
    .withMessage('Input country')
    .isLength({
      max: 30,
      min: 2
    })
    .withMessage('Length must not exceed 30 characters')
    .escape(),
  body('state')
    .trim(' ')
    .notEmpty()
    .withMessage('Input state')
    .isLength({
      max: 30,
      min: 2
    })
    .withMessage('Length must not exceed 30 characters')
    .escape(),
  body('lga')
    .trim(' ')
    .notEmpty()
    .withMessage('Input lga')
    .isLength({
      max: 30,
      min: 2
    })
    .withMessage('Length must not exceed 30 characters')
    .escape(),
  body('town')
    .trim(' ')
    .notEmpty()
    .withMessage('Input town')
    .isLength({
      max: 30,
      min: 2
    })
    .withMessage('Length must not exceed 30 characters')
    .escape(),
  body('institute_id')
    .notEmpty().isInt()
    .withMessage('Enter institution id')
    .escape()
];
