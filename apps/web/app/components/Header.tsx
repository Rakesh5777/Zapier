"use client";

import Link from "next/link";
import { useRecoilState } from "recoil";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticatedState } from "../atoms/authAtoms";
import { destroyCookie } from "nookies";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = () => {
    // Clear the auth token and any other user data
    destroyCookie(null, "auth_token");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-background dark:bg-background-dark shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          Sasta Zapier
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="flex items-center text-primary hover:text-primary/80"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/signin" className="hover:text-primary">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-background dark:bg-background-dark"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
