import type { Context as HonoContext } from "hono";

import { createAuth } from "@itsukis-products/pagedeck-auth";
import { createDb } from "@itsukis-products/pagedeck-db";
import { env } from "@itsukis-products/pagedeck-env/server";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const db = createDb(env.DB);
  const auth = createAuth({
    db,
    corsOrigin: env.CORS_ORIGIN,
    betterAuthSecret: env.BETTER_AUTH_SECRET,
    betterAuthUrl: env.BETTER_AUTH_URL,
    polarAccessToken: env.POLAR_ACCESS_TOKEN,
    polarSuccessUrl: env.POLAR_SUCCESS_URL,
  });

  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  return {
    db,
    auth,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
