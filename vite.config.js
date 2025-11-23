import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/Authentication': {
        target: 'https://travel-buddy-web.azurewebsites.net',
        changeOrigin: true,
      },
      '/Hotel': {
        target: 'https://travel-buddy-web.azurewebsites.net',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://travel-buddy-web.azurewebsites.net',
        changeOrigin: true,
      },
       '/user': {
        target: 'https://travel-buddy-web.azurewebsites.net',
        changeOrigin: true,
      }
    }
  }
})