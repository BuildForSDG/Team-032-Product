const {
  validationResult: validator
} = require('express-validator');
const Trainer = require('../models/trainerModel');
const {
  decodeToken
} = require('../utils/tokenHandler');
const {
  handleErrorResponse,
  handleSuccessResponse
} = require('../utils/messageHandler');
const generateVerificationEmail = require('../emailTemplates/verification');
const sendMail = require('../utils/sendMail');

/**
 * @description Trainer Controller
 * @class TrainerController
 */

class TrainerController {
  /**
   * @description Sign up method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Trainer
   * @member TrainerController
   */
  static async createTrainer(req, res) {
    const errors = validator(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    try {
      const trainer = await Trainer.findByEmail(req.body.email);

      if (trainer.rowCount > 0) {
        return handleErrorResponse(res, 'This email is already in use', 409);
      }

      const verificationEmail = generateVerificationEmail({
        data: req.body
      }, 'trainers');

      sendMail(
        req.body.email,
        'Email Verification',
        verificationEmail
      );
    } catch (e) {
      return handleErrorResponse(res, e, 500);
    }

    return handleSuccessResponse(
      res,
      {
        message: 'Verification email sent',
        email: req.body.email
      }
    );
  }

  /**
   * @description Verify Email
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Trainer
   * @member TrainerController
   */
  static async verifyEmail(req, res) {
    const {
      token
    } = req.query;

    let trainer;

    try {
      const {
        data
      } = decodeToken(token);

      trainer = await Trainer.create(data);
    } catch (e) {
      console.error(e);
      return handleErrorResponse(res, e.message);
    }

    return handleSuccessResponse(res, trainer, 201);
  }
}

module.exports = TrainerController;
