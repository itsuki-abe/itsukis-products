import { env } from "@itsukis-products/pagedeck-env/server";
import { drizzle } from "drizzle-orm/cockroach";

import * as schema from "./schema";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL || "",
    ssl: true,
  },
  schema,
});
