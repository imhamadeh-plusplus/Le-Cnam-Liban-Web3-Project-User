/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function ChannelRedirector() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  });

  if (dbUser?.username) {
    redirect(`/@${dbUser.username}`);
  }

  redirect("/login");
  return null;
}

export default function ChannelRootPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-zinc-400 p-6">
          Loading channel...
        </div>
      }
    >
      <ChannelRedirector />
    </Suspense>
  );
}
