import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
      minLength: 30,
    },
    category: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 2,
    },
    images: [{ type: String }],
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
