import express from "express";
import cookieParser from "cookie-parser";
import connect_db from "./config/connect_db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";

connect_db();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server is live"));
