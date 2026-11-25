/** biome-ignore-all lint/style/useImportType: <ignoring extension> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <ignoring extension> */
/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PencilSimpleIcon, XIcon } from "@phosphor-icons/react";
import { updateProfileAction } from "@/actions/profile";

interface EditProfileFormProps {
  initialName: string;
  initialBio: string | null;
}

export function EditProfileForm({
  initialName,
  initialBio,
}: EditProfileFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    const result = await updateProfileAction(formData);
    setSaving(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setIsOpen(false);
    router.refresh();
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 transition-colors"
      >
        <PencilSimpleIcon size={16} weight="bold" />
        <span>Edit Profile</span>
      </button>
    );
  }

  return (
    <div className="mt-4 w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-white">Edit Channel Details</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-zinc-400 hover:text-white"
        >
          <XIcon size={18} weight="bold" />
        </button>
      </div>

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-400">
            Channel Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-400">
            Bio / Description
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell viewers what your channel is about..."
            className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
