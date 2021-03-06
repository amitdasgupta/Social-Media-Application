// eslint-disable-next-line no-unused-vars
function handleError(error, req, res, next) {
  console.log(
    '*********************************************************************Error'
  );
  console.log(error && error.message);
  console.log(
    '*********************************************************************'
  );
  res
    .status(error.status || 500)
    .send(error.message || 'Internal Server Error');
}

module.exports = handleError;
