/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfileAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be logged in to update your profile." };
  }

  const name = String(formData.get("name") || "").trim();
  const bio = String(formData.get("bio") || "").trim();

  if (!name) {
    return { error: "Channel name cannot be empty." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      bio: bio || null,
    },
  });

  revalidatePath(`/channel/${session.user.id}`);
  revalidatePath("/");

  return { success: true };
}
