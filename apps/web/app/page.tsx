"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { isAuthenticatedState } from "./atoms/authAtoms";

export default function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const router = useRouter();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <span className="block">Automate Your Work with</span>
          <span className="block text-primary">Sasta Zapier</span>
        </h1>
        <p className="text-xl sm:text-2xl text-foreground/80 dark:text-foreground-dark/80">
          Big Automation, Small Price. Streamline your workflows without
          breaking the bank.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-16 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        </div>
        <Zap className="relative z-10 w-32 h-32 text-primary animate-pulse" />
      </div>
    </div>
  );
}
