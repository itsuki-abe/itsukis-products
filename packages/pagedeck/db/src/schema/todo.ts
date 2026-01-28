import { cockroachTable, text, boolean, int4 } from "drizzle-orm/cockroach-core";

export const todo = cockroachTable("todo", {
  id: int4("id").primaryKey().generatedAlwaysAsIdentity(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull(),
});
