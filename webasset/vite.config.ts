import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react(), UnoCSS()],
  build: {
    outDir: "../webserver/dist/",
  },
  optimizeDeps: {
    exclude: [".env"],
  },
});
