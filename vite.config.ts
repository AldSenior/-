import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // важно для GitHub Pages
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  plugins: [react()],
});
