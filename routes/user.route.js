import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { isAccount } from "../middlewares/isAccount.js";

const router = Router();

router.get("/", authentication, authorization(["admin"]), getAllUsers);

router.get("/:userId", authentication, getUser);

router.put("/:userId", authentication, isAccount, updateUser);

router.delete("/:userId", authentication, isAccount, deleteUser);

export default router;
