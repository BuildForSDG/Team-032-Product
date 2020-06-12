const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const pool = require('../middleware/configs/elephantsql');

dotenv.config();

module.exports = class {
  /**
   * Log user in with required user details.
   * @param {Object} userObject User object containing at least an email address.
   * @method successResponse
   */

  constructor(userObject) {
    // sign user access token

    const expiresIn = 900;
    const aud = userObject.userType;
    const iss = 'Howmies Entreprise';
    const algorithm = 'HS256';

    const tokenSecret = {
      keyPrivate: process.env.RSA_PRIVATE_KEY
    };

    const accessToken = jwt.sign(
      { iss, aud, uuid: userObject.id },
      tokenSecret.keyPrivate,
      { expiresIn, algorithm }
    );

    // sign user refresh token

    const exp = Math.floor(Date.now() / 1000) + (3600 * 24 * 30);

    const refreshToken = jwt.sign(
      {
        exp, aud, iss, uuid: userObject.id, data: userObject
      },
      tokenSecret.keyPrivate,
      { algorithm }
    );

    // set cookie options

    const cookieOptions = {
      maxAge: 3600000 * 24 * 30,
      path: '/api/v0.0.1/auth/refresh_token',
      domain: process.env.DOMAIN_NAME,
      httpOnly: true,
      sameSite: 'none'
      // secure: true,
    };

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.cookieOptions = cookieOptions;
    this.expiresIn = expiresIn;
    this.userObject = userObject;
  }


  /**
   * Successfully log user in after all checks and other requirements have been fulfilled.
   * @param {Response} res Express.js HTTP response.
   * @returns {Response} Express.js HTTP response.
   */
  successResponse(res) {
    const {
      accessToken, refreshToken, cookieOptions,
      expiresIn, userObject
    } = this;

    return res
      .status(200)
      .cookie('HURT', refreshToken, cookieOptions)
      .set('Authorization', accessToken)
      .send({
        message: 'Successfully logged in',
        data: {
          ...userObject,
          expiresIn: expiresIn * 1000
        }
      });
  }
};
