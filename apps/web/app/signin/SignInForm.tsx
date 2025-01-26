"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import api from "../utils/api";
import { isAuthenticatedState } from "../atoms/authAtoms";
import axios from "axios";
import { setCookie } from "nookies";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedData = signInSchema.parse(formData);
      const response = await api.post("/user/signin", validatedData);
      const { token } = response.data;

      if (token) {
        // Set the auth_token cookie
        setCookie(null, "auth_token", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "An error occurred during sign in"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Sign In
      </button>
    </form>
  );
}
