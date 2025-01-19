import express from "express";
import {
  signInController,
  signUpController,
} from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { signInSchema, signUpSchema } from "../types/user.types";

const userRouter = express.Router();

userRouter.post("/signIn", validateRequest(signInSchema), signInController);
userRouter.post("/signUp", validateRequest(signUpSchema), signUpController);

export default userRouter;
