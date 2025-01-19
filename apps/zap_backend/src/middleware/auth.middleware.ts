import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../configs/jwt.config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from cookies
    const token = req.cookies.auth_token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, getJwtSecret());

    // Attach user data to the request
    //@ts-ignore
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
