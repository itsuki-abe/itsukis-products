import { defineConfig } from "drizzle-kit";
import { existsSync } from "node:fs";
import { config } from "dotenv";

async function loadEnvFile() {
  const envPath = "../../../apps/pagedeck/server/.env";
  if (existsSync(envPath)) {
    config({
      path: envPath,
    });
  }
}

loadEnvFile();

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  dialect: "cockroach",
  dbCredentials: {
    url: process.env.PAGEDECK_DATABASE_URL || "",
  },
});
