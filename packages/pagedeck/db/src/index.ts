import { env } from "@itsukis-products/pagedeck-env/server";
import { drizzle } from "drizzle-orm/cockroach";
import { relations } from "./relations";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL || "",
    ssl: true,
  },
  relations,
});
