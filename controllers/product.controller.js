import Product from "../models/product.schema.js";

export const createProduct = async (req, res, next) => {
  const { name, price, category, description, images, stock } = req.body;

  const product = await Product.create({
    name,
    price,
    category,
    description,
    images,
    stock,
  });

  res.status(201).json({
    success: true,
    product,
  });
};
