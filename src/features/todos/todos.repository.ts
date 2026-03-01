import { createServerOnlyFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/services/db/db";
import { type TodoRecord, todoTable } from "@/services/db/schema";
import { takeUniqueOrThrow } from "@/utils/take-unique-or-throw";

export type TodosRepository = {
  getTodosByUserId: (args: { userId: string }) => Promise<TodoRecord[]>;
  createTodo: (args: {
    title: string;
    description?: string;
    userId: string;
  }) => Promise<TodoRecord>;
};

export const TodosRepository: TodosRepository = {
  getTodosByUserId: createServerOnlyFn(async ({ userId }) => {
    const result = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, userId));
    return result;
  }),
  createTodo: createServerOnlyFn(async ({ title, description, userId }) => {
    const result = await db
      .insert(todoTable)
      .values({
        title,
        description,
        userId,
      })
      .returning()
      .then(takeUniqueOrThrow);
    return result;
  }),
};
