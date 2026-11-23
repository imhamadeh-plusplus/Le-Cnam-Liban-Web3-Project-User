import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-btn";

async function AuthStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">Signed in as {session.user.name}</span>
        <SignOutButton />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="underline text-sm">
        Log In
      </Link>
      <Link href="/signup" className="underline text-sm">
        Sign Up
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Video Platform</h1>
          <Suspense fallback={<span className="text-sm">Loading...</span>}>
            <AuthStatus />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
