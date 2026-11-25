/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
/** biome-ignore-all lint/performance/noImgElement: <ignoring extension> */
import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { EditProfileForm } from "@/components/Edit-profile-form";
import { VideoCard } from "@/components/Video-card";
import { PlusIcon, UserPlusIcon } from "@phosphor-icons/react/dist/ssr";

async function HandleChannelContent({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const decoded = decodeURIComponent(handle);

  if (!decoded.startsWith("@")) {
    notFound();
  }

  const username = decoded.slice(1).toLowerCase();

  const profileUser = await prisma.user.findUnique({
    where: { username },
    include: {
      videos: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!profileUser) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isOwner = session?.user.id === profileUser.id;

  return (
    <main className="flex-1">
      {profileUser.banner ? (
        <img
          src={profileUser.banner}
          alt={`${profileUser.name} banner`}
          className="h-36 w-full object-cover border-b border-zinc-800"
        />
      ) : (
        <div className="h-36 w-full border-b border-zinc-800 bg-linear-to-r from-zinc-900 via-emerald-950/30 to-zinc-900" />
      )}

      <div className="mx-auto max-w-6xl px-6 pb-6 border-b border-zinc-800">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            {profileUser.image ? (
              <img
                src={profileUser.image}
                alt={profileUser.name}
                className="h-24 w-24 shrink-0 rounded-full border-4 border-black object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-black bg-emerald-500 text-3xl font-extrabold text-black">
                {profileUser.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="pb-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {profileUser.name}
              </h1>
              <p className="text-xs text-zinc-400">
                @{profileUser.username} • {profileUser.videos.length}{" "}
                {profileUser.videos.length === 1 ? "video" : "videos"} • Joined{" "}
                {profileUser.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isOwner ? (
              <>
                <EditProfileForm
                  initialName={profileUser.name}
                  initialBio={profileUser.bio}
                />
                <Link
                  href="/upload"
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
                >
                  <PlusIcon size={16} weight="bold" />
                  <span>Upload</span>
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
              >
                <UserPlusIcon size={16} weight="bold" />
                <span>Subscribe</span>
              </button>
            )}
          </div>
        </div>

        {profileUser.bio && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {profileUser.bio}
          </p>
        )}
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <h2 className="mb-5 text-base font-bold text-white">Videos</h2>

        {profileUser.videos.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
            <p className="text-sm text-zinc-400">
              {isOwner
                ? "You haven't uploaded any videos yet."
                : `${profileUser.name} hasn't uploaded any videos yet.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {profileUser.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={{
                  id: video.id,
                  title: video.title,
                  channelName: profileUser.name,
                  views: "0 views",
                  uploadedAt: video.createdAt.toLocaleDateString(),
                  duration: "00:00",
                  thumbnailColor: "bg-zinc-900",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function HandleChannelPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  return (
    <div className="flex min-h-screen w-full bg-black text-zinc-100 font-sans">
      <Suspense
        fallback={
          <aside className="w-64 shrink-0 border-r border-zinc-800 bg-black h-screen" />
        }
      >
        <Sidebar />
      </Suspense>

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />
        <Suspense
          fallback={
            <div className="p-6 text-sm text-zinc-400">Loading channel...</div>
          }
        >
          <HandleChannelContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
