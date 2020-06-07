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
    try {
      const verificationEmail = generateVerificationEmail({
        data: req.body
      });

      await sendMail(
        process.env.SENDGRID_API_KEY,
        req.body.email,
        process.env.SENDGRID_FROM,
        '032 Product Email Verification',
        verificationEmail
      );
    } catch (e) {
      return handleErrorResponse(res, e, 500);
    }
    return handleSuccessResponse(
      res, {
        email: req.body.email
      },
      201
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
      return handleErrorResponse(res, e.message);
    }
    return handleSuccessResponse(res, teacher);
  }
}

module.exports = TeacherController;
