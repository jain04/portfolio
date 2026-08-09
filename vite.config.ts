import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // The site is a GitHub Pages *project* page at
  // https://jain04.github.io/portfolio/, so built asset URLs need the repo
  // prefix. `vite preview` is included so the preview server mirrors the real
  // deployment; only `vite dev` stays on '/'.
  base: command === 'build' || isPreview ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
