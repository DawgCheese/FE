import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    plugins: [react()],
    server: {
      port: 80,
      host: "localhost",
    },
    publicDir: "public",
    resolve: {
      alias: {
        "@services": path.resolve(__dirname, "./src/services"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@models": path.resolve(__dirname, "./src/models"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@themes": path.resolve(__dirname, "./src/themes"),
        "@layout": path.resolve(__dirname, "./src/layout"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@features": path.resolve(__dirname, "./src/features"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: "src/page/app/index.tsx",
        },
      },
    },
  };
});
