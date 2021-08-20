function customResponse(res, statusCode, json = null, message = null) {
  switch (statusCode) {
    case 200:
      return res
        .status(statusCode)
        .json({ response: json, message: message || 'Success' });
    case 403:
      return res.status(statusCode).send(message || 'Not Authorized');
    case 404:
      return res.status(statusCode).send(message || 'Not Found');
    case 400:
      return res.status(statusCode).send(message || 'Bad Request');
    default:
      return res.status(500).send('Internal Server Error');
  }
}

module.exports = customResponse;
