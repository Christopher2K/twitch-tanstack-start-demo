import { createServerOnlyFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { db } from "@/services/db/db";
import {
  type NewTodoRecord,
  type TodoRecord,
  todoTable,
} from "@/services/db/schema";
import { takeUniqueOrThrow } from "@/utils/take-unique-or-throw";

export type TodosRepository = {
  getTodosByUserId: (args: { userId: string }) => Promise<TodoRecord[]>;
  createTodo: (args: {
    title: string;
    description?: string;
    isCompleted?: boolean;
    userId: string;
  }) => Promise<TodoRecord>;
};

export const TodosRepository: TodosRepository = {
  getTodosByUserId: createServerOnlyFn(async ({ userId }) => {
    const result = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.userId, userId));
    return result;
  }),
  createTodo: createServerOnlyFn(
    async ({ title, description, userId, isCompleted = false }) => {
      const result = await db
        .insert(todoTable)
        .values({
          title,
          description,
          userId,
          completedAt: isCompleted ? sql`now()` : null,
        })
        .returning()
        .then(takeUniqueOrThrow);
      return result;
    },
  ),
};
