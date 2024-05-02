import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

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
  adapter: netlify()
});