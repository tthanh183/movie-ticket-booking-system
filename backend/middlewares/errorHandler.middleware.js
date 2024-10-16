const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  const success = false;

  if (err.name === 'ValidationError') {
    message = message.split(':').pop().trim();
  }

  res.status(statusCode).json({
    success,
    message,
  });
};

export default errorHandler;
