function customResponse(res, statusCode, json = null, message = null) {
  switch (statusCode) {
    case 200:
      return res
        .status(statusCode)
        .json({ data: json, message: message || 'Success' });
    case 403:
      return res.status(statusCode).json({ message: 'Not Authorized' });
    case 404:
      return res.status(statusCode).json({ message: 'Not Found' });
    default:
      return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = customResponse;
