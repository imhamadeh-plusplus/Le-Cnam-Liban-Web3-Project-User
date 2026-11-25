/** biome-ignore-all lint/a11y/noLabelWithoutControl: <ignoring extension> */
/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
/** biome-ignore-all lint/style/useImportType: <ignoring extension> */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Log In</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-sm">
        Need an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
