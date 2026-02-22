import { createServerOnlyFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/services/db/db";
import { type UserRecord, userTable } from "@/services/db/schema";
import { takeUniqueOrThrow } from "@/utils/take-unique-or-throw";

export type AuthRepository = {
  createUser: (args: {
    email: string;
    password: string;
  }) => Promise<UserRecord>;
  getUserByEmail: (args: { email: string }) => Promise<UserRecord | null>;
};

export const authRepository: AuthRepository = {
  createUser: createServerOnlyFn(async ({ email, password }) => {
    const user = await db
      .insert(userTable)
      .values({
        email,
        password,
      })
      .returning()
      .then(takeUniqueOrThrow);

    return user;
  }),
  getUserByEmail: createServerOnlyFn(async ({ email }) => {
    const results = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    return results[0] ?? null;
  }),
};
