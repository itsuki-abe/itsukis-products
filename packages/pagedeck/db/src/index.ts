import type { Hyperdrive } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/cockroach";
import { relations } from "./relations";

export type Database = ReturnType<typeof createDb>;

export function createDb(hyperdrive: Hyperdrive) {
  return drizzle({
    connection: {
      connectionString: hyperdrive.connectionString,
      ssl: true,
    },
    relations,
  });
}
