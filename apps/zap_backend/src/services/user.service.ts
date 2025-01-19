import { prisma } from "@repo/database";
import { compareHash, createHash } from "../utils/util";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../configs/jwt.config";

export const signInService = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) throw new Error("User not found");

  const passwordMatch = await compareHash(user.password, password);
  if (!passwordMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, getJwtSecret());
  return { token };
};

export const signUpService = async (
  email: string,
  name: string,
  password: string
) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await createHash(password);

  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  const token = jwt.sign({ userId: user.id }, getJwtSecret());
  return { token };
};
