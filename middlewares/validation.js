export const validation = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.format(),
      });
    }

    req.body = result.data;
    next();
  };
};
