"use client";

import { RecoilRoot } from "recoil";
import ThemeProvider from "./ThemeProvider";
import Header from "./Header";
import RecoilInitializer from "./RecoilInitializer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RecoilInitializer />
        <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </ThemeProvider>
    </RecoilRoot>
  );
}
