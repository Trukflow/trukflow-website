import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Strip debug logging from production bundles so user data never lands in the console
  esbuild: mode === "production" ? { pure: ["console.log", "console.debug", "console.info"] } : undefined,
  build: {
    sourcemap: false,
  },
}));
