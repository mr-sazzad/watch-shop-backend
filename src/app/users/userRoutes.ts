import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { userValidation } from "./user.validation";
import {
  AddToCart,
  createUser,
  getCurrentUser,
  loginUser,
} from "./userController";

const router = Router();

router.post("/sign-up", validateRequest(userValidation), createUser);

router.post("/sign-in", loginUser);

router.get("/current-user", getCurrentUser);

router.patch("/cart", AddToCart);

export default router;
