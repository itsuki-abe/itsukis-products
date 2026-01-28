import { Polar } from "@polar-sh/sdk";

export function createPolarClient(accessToken: string) {
  return new Polar({
    accessToken,
    server: "sandbox",
  });
}
