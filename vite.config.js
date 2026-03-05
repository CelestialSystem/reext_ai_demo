import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reext from './node_modules/@sencha/reext/dist/ReExt/vite-plugin-reext.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reext(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
