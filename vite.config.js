import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE=/gmintegra-admin/ en GitHub Pages; local y Vercel usan /
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [tailwindcss(), react()],
})
