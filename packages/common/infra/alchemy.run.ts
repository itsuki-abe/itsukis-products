import alchemy from "alchemy";
import { TanStackStart, Worker } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";
import { existsSync } from "node:fs";

const envPath = "./.env";
const webEnvPath = "../../../apps/pagedeck/web/.env";
const serverEnvPath = "../../../apps/pagedeck/server/.env";

existsSync(envPath) && config({ path: envPath });
existsSync(webEnvPath) && config({ path: webEnvPath });
existsSync(serverEnvPath) && config({ path: serverEnvPath });

const app = await alchemy("itsukis-products", {
  stateStore: (scope) =>
    new CloudflareStateStore(scope, {
      stateToken: alchemy.secret(process.env.ALCHEMY_STATE_TOKEN),
    }),
});

export const pagedeckWeb = await TanStackStart("pagedeck-web", {
  name: "pagedeck-web",
  cwd: "../../../apps/pagedeck/web",
  bindings: {
    VITE_SERVER_URL: process.env.PAGEDECK_VITE_SERVER_URL!,
    DATABASE_URL: alchemy.secret(process.env.PAGEDECK_DATABASE_URL!),
    CORS_ORIGIN: process.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret(process.env.PAGEDECK_BETTER_AUTH_SECRET!),
    BETTER_AUTH_URL: process.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret(process.env.PAGEDECK_POLAR_ACCESS_TOKEN!),
    POLAR_SUCCESS_URL: process.env.PAGEDECK_POLAR_SUCCESS_URL!,
  },
});

export const pagedeckServer = await Worker("pagedeck-server", {
  name: "pagedeck-server",
  cwd: "../../../apps/pagedeck/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    DATABASE_URL: alchemy.secret(process.env.PAGEDECK_DATABASE_URL!),
    CORS_ORIGIN: process.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret(process.env.PAGEDECK_BETTER_AUTH_SECRET!),
    BETTER_AUTH_URL: process.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret(process.env.PAGEDECK_POLAR_ACCESS_TOKEN!),
    POLAR_SUCCESS_URL: process.env.PAGEDECK_POLAR_SUCCESS_URL!,
  },
  dev: {
    port: 3000,
  },
});

console.log(`PageDeck Web    -> ${pagedeckWeb.url}`);
console.log(`PageDeck Server -> ${pagedeckServer.url}`);

await app.finalize();
