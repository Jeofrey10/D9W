import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'lead-api-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/api/leads', async (req, res) => {
          try {
            const { default: handler } = await import('./api/leads.ts')
            await handler(req as any, res as any)
          } catch (err) {
            console.error('Dev server error in /api/leads middleware:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ success: false, message: 'Internal server error in dev API' }))
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
