import alchemy from "alchemy";
import { Astro, TanStackStart, Worker, Hyperdrive } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";
import { existsSync } from "node:fs";

const envPath = "./.env";
const webEnvPath = "../../../apps/pagedeck/web/.env";
const serverEnvPath = "../../../apps/pagedeck/server/.env";
const lpEnvPath = "../../../apps/pagedeck/lp/.env";

existsSync(envPath) && config({ path: envPath });
existsSync(webEnvPath) && config({ path: webEnvPath });
existsSync(serverEnvPath) && config({ path: serverEnvPath });
existsSync(lpEnvPath) && config({ path: lpEnvPath });

const app = await alchemy("itsukis-products", {
  stateStore: (scope) =>
    new CloudflareStateStore(scope, {
      stateToken: alchemy.secret.env.ALCHEMY_STATE_TOKEN!,
    }),
});

export const pagedeckDB = await Hyperdrive("pagedeck-db", {
  name: "pagedeck-db",
  origin: alchemy.secret.env.PAGEDECK_DATABASE_URL!,
});

export const pagedeckWeb = await TanStackStart("pagedeck-web", {
  name: "pagedeck-web",
  cwd: "../../../apps/pagedeck/web",
  bindings: {
    VITE_SERVER_URL: alchemy.env.PAGEDECK_VITE_SERVER_URL!,
    CORS_ORIGIN: alchemy.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.PAGEDECK_BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret.env.PAGEDECK_POLAR_ACCESS_TOKEN!,
    POLAR_SUCCESS_URL: alchemy.env.PAGEDECK_POLAR_SUCCESS_URL!,
    DB: pagedeckDB,
  },
});

export const pagedeckServer = await Worker("pagedeck-server", {
  name: "pagedeck-server",
  cwd: "../../../apps/pagedeck/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    CORS_ORIGIN: alchemy.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.PAGEDECK_BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret.env.PAGEDECK_POLAR_ACCESS_TOKEN!,
    POLAR_SUCCESS_URL: alchemy.env.PAGEDECK_POLAR_SUCCESS_URL!,
    DB: pagedeckDB,
  },
  dev: {
    port: 3000,
  },
});

export const pagedeckLp = await Astro("pagedeck-lp", {
  name: "pagedeck-lp",
  cwd: "../../../apps/pagedeck/lp",
  bindings: {
    VITE_LP_ADOBE_FONT_ID: alchemy.env.PAGEDECK_VITE_LP_ADOBE_FONT_ID!,
    NOCODB_BASE_URL: alchemy.secret.env.PAGEDECK_NOCODB_BASE_URL!,
    NOCODB_API_TOKEN: alchemy.secret.env.PAGEDECK_NOCODB_API_TOKEN!,
    NOCODB_BASE_ID: alchemy.secret.env.PAGEDECK_NOCODB_BASE_ID!,
    NOCODB_WAITLIST_TABLE_ID: alchemy.secret.env.PAGEDECK_NOCODB_WAITLIST_TABLE_ID!,
    WAITLIST_DISCORD_WEBHOOK_URL: alchemy.secret.env.PAGEDECK_WAITLIST_DISCORD_WEBHOOK_URL!,
  },
});

console.log(`PageDeck Web    -> ${pagedeckWeb.url}`);
console.log(`PageDeck Server -> ${pagedeckServer.url}`);
console.log(`PageDeck LP     -> ${pagedeckLp.url}`);

await app.finalize();
