import jwt from "jsonwebtoken";

// Authentication
export const authentication = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(new Error("No token provieded", { cause: 401 }));

  const decoded = jwt.verify(token, "secretkey123");

  req.user = decoded;
  // console.log(decoded);
  next();
};
