import { Router } from "express";
import { login, logout, regitser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", regitser);

router.post("/login", login);

router.post("/logout", logout);

export default router;
