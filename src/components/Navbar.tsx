// Keep line 2, Do NOT delete it okay??
/** biome-ignore-all assist/source/organizeImports: Keep imports grouped by package. */ 
import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/Sign-out-btn";
import { SearchBar } from "@/components/Search-bar";

async function NavbarAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/channel"
          className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <span className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-black">
            {session.user.name.charAt(0).toUpperCase()}
          </span>
          <span className="max-w-30 truncate">{session.user.name}</span>
        </Link>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <Link
        href="/login"
        className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-900 transition-colors"
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between gap-4 border-b border-zinc-800 bg-black/80 px-6 backdrop-blur-md">
      <div className="flex-1 max-w-xl">
        <SearchBar />
      </div>
      <Suspense fallback={<div className="h-8 w-24 animate-pulse rounded-full bg-zinc-900" />}>
        <NavbarAuth />
      </Suspense>
    </header>
  );
}