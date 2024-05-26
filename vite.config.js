import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'React Tes',
        short_name: 'React Tes App',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
          // {
          //   src: 'icon-512x512.png',
          //   sizes: '512x512',
          //   type: 'image/png'
          // }
        ]
      }
    })
  ],
})


