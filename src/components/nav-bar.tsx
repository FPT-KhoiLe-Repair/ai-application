// src/components/nav-bar.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavBarProps = {
  href: string;
  label: string;
};

function NavLink({ href, label }: NavBarProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
        isActive
          ? "bg-linear-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white shadow-md hover:shadow-lg"
          : "text-slate-700 hover:bg-slate-100 hover:shadow-sm hover:brightness-90"
      )}
    >
      {label}
    </Link>
  );
}

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/90 backdrop-blur-md dark:bg-black/80 sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* <Image
            src="/logo_1.png"
            alt="NOVA AI Logo"
            width={32}
            height={32}
            className="rounded-md"
          /> */}
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NOVA AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          <NavLink href="/" label="Home" />
          <NavLink href="/flashcards" label="Flashcards" />
          <NavLink href="/settings" label="Settings" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-700" />
          ) : (
            <Menu className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/flashcards"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Flashcards
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}