class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (err, res) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

export default ErrorHandler;
