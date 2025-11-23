// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "An AI-powered flashcard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        {/* Removed p-8 padding to avoid scroll conflict */}
        <main>{children}</main>
      </body>
    </html>
  );
}