// @ts-check

import alchemy from "alchemy/cloudflare/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

const adobeFont = fontProviders.adobe({
  id: import.meta.env.VITE_LP_ADOBE_FONT_ID,
});

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tsconfigPaths(), tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        name: "Futura PT",
        cssVariable: "--font-futura-pt",
        provider: adobeFont,
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },

  output: "server",

  adapter: alchemy(),
});
