import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {global: "window"} ,
  server: {
    // Specify the development server port
    port: 5001,
  },
  // Base name of your app
  base: "./index.html", // Replace this with the subdirectory path if needed
});
