module.exports.dbQueryErrorHandler = () => ({
  error: (res) => res.status(500).send('Internal server error')
});
