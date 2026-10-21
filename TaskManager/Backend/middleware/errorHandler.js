const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode() || 500;
  return res
    .status(statusCode)
    .json({
      success: false,
      message: statusCode === 500 ? "Internal Server Error" : err.message,
    });
};
