import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedUserOnlyMiddleware } from "../auth/auth.functions";
import { todoFormSchema } from "./todos.forms";
import { TodosRepository } from "./todos.repository";

export const getTodosByUserIdFn$ = createServerFn({ method: "GET" })
  .middleware([authenticatedUserOnlyMiddleware])
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

export const createTodoFn$ = createServerFn({ method: "POST" })
  .middleware([authenticatedUserOnlyMiddleware])
  .inputValidator(todoFormSchema)
  .handler(async ({ data, context }) => {
    console.log("createTodoFn$", data);
    const todo = await TodosRepository.createTodo({
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
      userId: context.user.userId,
    });

    return todo;
  });
