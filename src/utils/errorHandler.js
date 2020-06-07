module.exports.dbQueryErrorHandler = (err) => {
  console.log(err);
  return {
    error: (res) => res.status(500).send('Internal server error')
  };
};
