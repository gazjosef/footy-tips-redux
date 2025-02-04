import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
