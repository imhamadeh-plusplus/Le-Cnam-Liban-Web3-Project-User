"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  }
  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="border px-3 py-1.5 rounded text-sm"
    >
      Sign-Out
    </button>
  );
}
