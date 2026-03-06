// Authorization
export const authorization = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return next(new Error("forbidden resource", { cause: 403 }));
    }
  };
};
