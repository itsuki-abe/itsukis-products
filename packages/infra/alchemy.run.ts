import alchemy from "alchemy";
import { TanStackStart, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/pagedeck/web/.env" });
config({ path: "../../apps/pagedeck/server/.env" });

const app = await alchemy("itsukis-products");

export const pagedeckWeb = await TanStackStart("pagedeck-web", {
  cwd: "../../apps/pagedeck/web",
  bindings: {
    VITE_SERVER_URL: alchemy.env.PAGEDECK_VITE_SERVER_URL!,
    DATABASE_URL: alchemy.secret.env.PAGEDECK_DATABASE_URL!,
    CORS_ORIGIN: alchemy.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.PAGEDECK_BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret.env.PAGEDECK_POLAR_ACCESS_TOKEN!,
    POLAR_SUCCESS_URL: alchemy.env.PAGEDECK_POLAR_SUCCESS_URL!,
  },
});

export const pagedeckServer = await Worker("pagedeck-server", {
  cwd: "../../apps/pagedeck/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    DATABASE_URL: alchemy.secret.env.PAGEDECK_DATABASE_URL!,
    CORS_ORIGIN: alchemy.env.PAGEDECK_CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.PAGEDECK_BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.PAGEDECK_BETTER_AUTH_URL!,
    POLAR_ACCESS_TOKEN: alchemy.secret.env.PAGEDECK_POLAR_ACCESS_TOKEN!,
    POLAR_SUCCESS_URL: alchemy.env.PAGEDECK_POLAR_SUCCESS_URL!,
  },
  dev: {
    port: 3000,
  },
});

console.log(`PageDeck Web    -> ${pagedeckWeb.url}`);
console.log(`PageDeck Server -> ${pagedeckServer.url}`);

await app.finalize();
