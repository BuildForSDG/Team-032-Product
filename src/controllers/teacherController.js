const {
  validationResult: validator
} = require('express-validator');
const Teacher = require('../models/teacherModel');
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
 * @description Teacher Controller
 * @class TeacherController
 */

class TeacherController {
  /**
   * @description Sign up method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Teacher
   * @member TeacherController
   */
  static async createTeacher(req, res) {
    const errors = validator(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    try {
      const teacher = await Teacher.findByEmail(req.body.email);

      if (teacher.rowCount > 0) {
        return handleErrorResponse(res, 'This email is already in use', 409);
      }

      const verificationEmail = generateVerificationEmail({
        data: req.body
      }, 'teachers');

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
   * @returns {object} Teacher
   * @member TeacherController
   */
  static async verifyEmail(req, res) {
    const {
      token
    } = req.query;

    let teacher;

    try {
      const {
        data
      } = decodeToken(token);

      teacher = await Teacher.create(data);
    } catch (e) {
      console.log(e);
      return handleErrorResponse(res, e.message);
    }

    return handleSuccessResponse(res, teacher, 201);
  }
}

module.exports = TeacherController;
