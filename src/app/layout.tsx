// app/layout.tsx
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar }  from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "An AI-powered flashcard application",
};


export default function RootLayout({children,}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
