import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        breeds: resolve(__dirname, "src/breeds/index.html"),
        details: resolve(__dirname, "src/details/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});
