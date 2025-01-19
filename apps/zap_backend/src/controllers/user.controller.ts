import { Request, Response } from "express";
import { signInService, signUpService } from "../services/user.service";
import { signInSchema, signUpSchema } from "../types/user.types";

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await signInService(email, password);

    res.cookie("auth_token", response.token, {
      httpOnly: true,
      secure: false, // Change to `true` in production
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "User signed in", token: response.token });
  } catch (error) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const response = await signUpService(email, name, password);

    res.cookie("auth_token", response.token, {
      httpOnly: true,
      secure: false, // Change to `true` in production
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "User created", token: response.token });
  } catch (error) {
    console.error("Error during sign up:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
