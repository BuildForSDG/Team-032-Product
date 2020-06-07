/**
 * @param {string} res
 * @param {string} data
 * @param {integer} statusCode
 * @return {Object}
 */
module.exports.handleSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json({
  status: 'success',
  data
});

/**
 * @param {string} res
 * @param {string} data
 * @param {integer} statusCode
 * @return {Object}
 */
module.exports.handleErrorResponse = (res, error, statusCode = 400) => res.status(statusCode).json({
  status: 'Request Failed',
  error
});
