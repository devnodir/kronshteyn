import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import rollupReplace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
