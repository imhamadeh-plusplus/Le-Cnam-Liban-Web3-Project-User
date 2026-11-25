import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const cleanUsername = String(user.username || user.name || "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, "");

          const existing = await prisma.user.findUnique({
            where: { username: cleanUsername },
          });

          if (existing) {
            throw new Error("Username is already taken");
          }

          return {
            data: {
              ...user,
              username: cleanUsername,
              name: cleanUsername,
            },
          };
        },
      },
    },
  },
});
