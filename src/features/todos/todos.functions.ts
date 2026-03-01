import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { TodosRepository } from "./todos.repository";

export const getTodosByUserIdFn$ = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const todos = await TodosRepository.getTodosByUserId({
      userId: data.userId,
    });
    return todos;
  });
