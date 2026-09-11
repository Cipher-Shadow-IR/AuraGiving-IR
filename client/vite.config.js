import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  server: {
    port: 5175,
    open: false
  },
  plugins: [react(), nodePolyfills()],
  esbuild: {
    target: "es2020"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  define: {
    "process.env": {},
    "global": 'globalThis'
  },
  supported: {
    bigint: true
  }
});
