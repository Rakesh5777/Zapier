import bcrypt from "bcrypt";

// Function to hash the password
export const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Function to compare the password
export const compareHash = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
