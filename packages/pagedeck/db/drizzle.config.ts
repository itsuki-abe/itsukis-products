import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "../../../apps/pagedeck/server/.env",
});

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  dialect: "cockroach",
  dbCredentials: {
    url: process.env.PAGEDECK_DATABASE_URL || "",
  },
});
