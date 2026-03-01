import { redirect } from "@tanstack/react-router";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import argon2 from "argon2";
import { z } from "zod";
import { env } from "@/env";
import type { UserSession } from "./auth.model";
import { authRepository } from "./auth.repository";

const hashPassword = createServerOnlyFn((password: string) =>
  argon2.hash(password),
);

const verifyPassword = createServerOnlyFn(
  (args: { password: string; hash: string }) =>
    argon2.verify(args.hash, args.password),
);

const useUserSession = () =>
  useSession<UserSession>({
    password: env.SESSION_SECRET,
    maxAge: 3600,
  });

export const signupFn$ = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const hash = await hashPassword(data.password);
    const user = await authRepository.createUser({
      email: data.email,
      password: hash,
    });

    const session = await useUserSession();
    await session.update({
      user: {
        email: user.email,
        userId: user.id,
      },
    });

    throw redirect({ to: "/todos" });
  });

export const loginFn$ = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const error = new Error("Credentials not valid");
    const user = await authRepository.getUserByEmail({
      email: data.email,
    });

    if (!user) {
      throw error;
    }

    const isValid = await verifyPassword({
      password: data.password,
      hash: user?.password,
    });

    if (!isValid) {
      throw error;
    }

    const session = await useUserSession();
    await session.update({
      user: {
        email: user.email,
        userId: user.id,
      },
    });

    throw redirect({ to: "/todos" });
  });

export const getCurrentUserFn$ = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useUserSession();
    if (session.data?.user) {
      return session.data.user;
    }
    return null;
  },
);

export const logoutFn$ = createServerFn().handler(async () => {
  const session = await useUserSession();
  await session.clear();
  throw redirect({ to: "/login" });
});
