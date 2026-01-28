import { todo } from "@itsukis-products/pagedeck-db/schema/todo";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { publicProcedure } from "../index";

export const todoRouter = {
  getAll: publicProcedure.handler(async ({ context }) => {
    return await context.db.select().from(todo);
  }),

  create: publicProcedure
    .input(v.object({ text: v.pipe(v.string(), v.minLength(1)) }))
    .handler(async ({ input, context }) => {
      return await context.db.insert(todo).values({
        text: input.text,
      });
    }),

  toggle: publicProcedure
    .input(v.object({ id: v.number(), completed: v.boolean() }))
    .handler(async ({ input, context }) => {
      return await context.db
        .update(todo)
        .set({ completed: input.completed })
        .where(eq(todo.id, input.id));
    }),

  delete: publicProcedure
    .input(v.object({ id: v.number() }))
    .handler(async ({ input, context }) => {
      return await context.db.delete(todo).where(eq(todo.id, input.id));
    }),
};
