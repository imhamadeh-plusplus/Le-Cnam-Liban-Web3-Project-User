/** biome-ignore-all lint/a11y/noLabelWithoutControl: <ignoring extension> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <ignoring extension> */
/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
/** biome-ignore-all lint/style/useImportType: <ignoring extension> */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanUsername = username
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "");
    if (cleanUsername.length < 3) {
      setError(
        "Username must be at least 3 characters (letters, numbers, or _)",
      );
      return;
    }

    setLoading(true);

    const { error } = await (authClient.signUp.email as any)({
      name: cleanUsername,
      username: cleanUsername,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Could not create account");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            required
            placeholder="e.g. @unique"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

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
            minLength={8}
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
