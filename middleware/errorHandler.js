const handleMongoCastError = (err) => {
  return {
    statusCode: 400,
    message: `Invalid ${err.path}: ${err.value}`
  };
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return {
    statusCode: 400,
    message: `${field} already exists`
  };
};

export default (err, req, res, next) => {
  if (!err.isOperational || err.statusCode >= 500) {
    console.error(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message
  });
};