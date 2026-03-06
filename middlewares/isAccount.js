export const isAccount = (req, res, next) => {
  const userId = req.params.userId;

  if (userId !== req.user.id && req.user.role !== "admin") {
    return next(new Error("access denied", { cause: 403 }));
  }
  next();
};
