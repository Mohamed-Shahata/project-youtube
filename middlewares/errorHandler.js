// Error Handler
export const errorHandler = (err, req, res, next) => {
  res.status(err["cause"] || 500).json({
    success: false,
    errorMsg: err.message || "Internal server error",
  });
};
