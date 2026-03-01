import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedUserOnlyMiddleware } from "../auth/auth.functions";
import { TodosRepository } from "./todos.repository";

export const getTodosByUserIdFn$ = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .middleware([authenticatedUserOnlyMiddleware])
  .handler(async ({ data }) => {
    const todos = await TodosRepository.getTodosByUserId({
      userId: data.userId,
    });
    return todos;
  });
