module.exports = function (err, req, res, next) {
  // Log the exceptions and the retur the status
  res.status(500).send('Something went wrong');
};