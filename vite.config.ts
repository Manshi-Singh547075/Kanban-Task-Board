import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Only include Replit plugins in Replit environments
const isReplit = process.env.REPL_ID !== undefined;

export default defineConfig(async () => {
  const plugins = [react()];

  // Optionally add Replit-only plugins
  if (isReplit && process.env.NODE_ENV !== "production") {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
    const cartographer = await import("@replit/vite-plugin-cartographer");

    plugins.push(runtimeErrorOverlay.default());
    plugins.push(cartographer.cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
  };
});
