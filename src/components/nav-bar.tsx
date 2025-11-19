// components/nav-bar.tsx
"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image
 from "next/image";
type NavBarProps = {
    href: string;
    label: string;
}

function NavLink({
  href,
  label,
}: NavBarProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href = {href}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-md hover:scale-103 transition-all duration-200"
          : " text-slate-700 rounded-xl font-semibold hover:border-blue-600 hover:shadow-md hover:scale-103 transition-all duration-200"
      )}
      >
        {label}
      </Link>
  );
};

export function NavBar() {
    return (
        <header className="border-b bg-white/80 backdrop-blur dark:bg-black/80">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
              src="/logo_1.png"           // 📌 thay logo bạn ở đây
              alt="Logo"
              width={36}                // size bạn tùy chỉnh
              height={36}
              className="rounded-md"    // optional
              />
              <span className="text-3xl font-bold tracking-tight from-blue-600 to-indigo-600 bg-linear-to-r bg-clip-text text-transparent">
                NOVA AI
              </span>
            </Link>

            <nav className="flex gap-2">
              <NavLink href="/" label="Home" />
              <NavLink href="/flashcards" label="Flashcards" />
              <NavLink href="/settings" label="Settings" />
            </nav>
          </div>
        </header>

    );
}