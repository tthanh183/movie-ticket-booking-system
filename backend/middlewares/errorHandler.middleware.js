const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const success = false;
  res.status(statusCode).json({
    success,
    message,
  });
};

export default errorHandler;