const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

/**
 * @param {object} payload
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
module.exports.generateToken = (
  payload,
  tokenExpiryDate = '1h',
  secret = process.env.RSA_PRIVATE_KEY.replace(/\|\|n\|\|/g, '\n')
) => jwt.sign(payload, secret, {
  expiresIn: tokenExpiryDate
});

/**
 * @param {string} token
 * @return {object} decodeToken
 */
module.exports.decodeToken = (token) => jwt.verify(token, process.env.RSA_PRIVATE_KEY.replace(/\|\|n\|\|/g, '\n'));
