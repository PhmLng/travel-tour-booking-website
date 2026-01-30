<<<<<<< HEAD
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
=======
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
>>>>>>> origin/huy-dev

export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
=======
  plugins: [react(), tailwindcss()],
>>>>>>> origin/huy-dev
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
})
=======
})
>>>>>>> origin/huy-dev
