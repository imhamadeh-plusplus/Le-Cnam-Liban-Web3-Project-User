"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <MagnifyingGlassIcon
        size={18}
        weight="bold"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos, channels..."
        className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2 pl-11 pr-9 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-500 focus:bg-black transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
        >
          <XIcon size={15} weight="bold" />
        </button>
      )}
    </form>
  );
}