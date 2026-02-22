import { sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const userTable = p.pgTable("user", {
  id: p.uuid().primaryKey().default(sql`uuidv7()`),
  email: p.text().unique().notNull(),
  password: p.text().notNull(),
  createdAt: p.timestamp().notNull().default(sql`now()`),
  updatedAt: p
    .timestamp()
    .notNull()
    .default(sql`now()`)
    .$onUpdate(() => new Date()),
});

export const todo = p.pgTable("todo", {
  id: p.uuid().primaryKey().default(sql`uuidv7()`),
  title: p.text().notNull(),
  description: p.text(),
  completedAt: p.timestamp(),
  createdAt: p.timestamp().notNull().default(sql`now()`),
  updatedAt: p
    .timestamp()
    .notNull()
    .default(sql`now()`)
    .$onUpdate(() => new Date()),
  userId: p
    .uuid()
    .notNull()
    .references(() => userTable.id),
});
