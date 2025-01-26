"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../atoms/authAtoms";

export default function Dashboard() {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <p className="text-xl mb-4 text-foreground/80 dark:text-foreground-dark/80">
        Start creating your automations with Sasta Zapier!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-primary/10 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Quick Start</h2>
          <p>Create your first automation in minutes.</p>
        </div>
        <div className="p-6 bg-secondary/10 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Explore Templates</h2>
          <p>Discover pre-built workflows for common tasks.</p>
        </div>
      </div>
    </div>
  );
}
