const {
  body
} = require('express-validator');

module.exports.createTeacher = [
  body('email')
  .notEmpty().normalizeEmail().isEmail()
  .withMessage('Input email')
  .escape(),
  body('password')
  .trim(' ')
  .notEmpty()
  .withMessage('Input password')
  .isLength({
    min: 8
  })
  .withMessage('Length must not exceed 30 characters')
  .escape(),
  body('phone').isInt()
  .notEmpty()
  .withMessage('Input phone number')
  .isLength({
    max: 11,
    min: 2
  })
  .withMessage('Length must not exceed 11 characters')
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
  body('deployed')
  .notEmpty().isBoolean()
  .withMessage('Specify true or false')
  .escape(),
  body('level_of_education_id')
  .notEmpty().isInt()
  .withMessage('Input level')
  .isLength({
    max: 2
  })
  .escape()
];
