import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// "./" makes every asset path relative, so the build works on GitHub Pages
// whatever your repository is called (https://you.github.io/any-repo-name/).
// If you ever use a custom domain or need an absolute path, build with:
//   VITE_BASE=/your-repo-name/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
  },
})
