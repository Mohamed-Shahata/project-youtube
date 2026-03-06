import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
import { createProduct } from "../controllers/product.controller.js";
import { validation } from "../middlewares/validation.js";
import { createProductSchema } from "../schemas/product/createProduct.js";

const router = Router();

router.post(
  "/",
  authentication,
  authorization(["admin"]),
  validation(createProductSchema),
  createProduct,
);

export default router;
