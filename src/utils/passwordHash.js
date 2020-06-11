const bcrypt = require('bcryptjs');

/**
 * @param {string} password
 * @return {string} hash
 */
module.exports.hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} password
 * @param {string} hashPwd
 * @return {string} hash
 */
module.exports.comparePassword = (password, hashPwd) => bcrypt.compareSync(password, hashPwd);
