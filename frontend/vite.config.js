import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"  // ← thêm dòng này
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // ← thêm dòng này
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})