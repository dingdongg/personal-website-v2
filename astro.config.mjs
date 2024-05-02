import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { macchiato } from '@catppuccin/vscode';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      nesting: true,
    })
  ],
  output: "server",
  prefetch: {
    defaultStrategy: "load"
  },
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      theme: macchiato,
      wrap: true,
    }
  }
});