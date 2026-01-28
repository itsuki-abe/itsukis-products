import type { Database } from "@itsukis-products/pagedeck-db";
import * as schema from "@itsukis-products/pagedeck-db/schema/auth";
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { createPolarClient } from "./lib/payments";

export interface AuthConfig {
  db: Database;
  corsOrigin: string;
  betterAuthSecret: string;
  betterAuthUrl: string;
  polarAccessToken: string;
  polarSuccessUrl: string;
}

export function createAuth(config: AuthConfig) {
  const polarClient = createPolarClient(config.polarAccessToken);

  return betterAuth({
    database: drizzleAdapter(config.db, {
      provider: "pg",
      schema: schema,
    }),
    trustedOrigins: [config.corsOrigin],
    emailAndPassword: {
      enabled: true,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60,
      },
    },
    secret: config.betterAuthSecret,
    baseURL: config.betterAuthUrl,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
      crossSubDomainCookies: {
        enabled: true,
        domain: ".cupmen4800.workers.dev",
      },
    },
    plugins: [
      polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        enableCustomerPortal: true,
        use: [
          checkout({
            products: [
              {
                productId: "your-product-id",
                slug: "pro",
              },
            ],
            successUrl: config.polarSuccessUrl,
            authenticatedUsersOnly: true,
          }),
          portal(),
        ],
      }),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
