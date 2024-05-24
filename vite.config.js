import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'CountOnMe',
        short_name: 'CountOnMe',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
        "screenshots": [
          {
            "src": "screenshots/Skærmbillede 2024-05-24 103443.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
          },

          {
            "src": "screenshots/Skærmbillede 2024-05-24 105948.png",
            "sizes": "373x666",
            "type": "image/png",
            "form_factor": "narrow"
          }
        ]
      }, 
    })
  ],
})