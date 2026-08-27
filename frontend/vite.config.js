import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fast dev/build: React fast-refresh plugin only, no extra runtime deps.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Same-domain routing for the LRU Cache Service demo: instead of linking
      // out to a separate host/port (and dealing with CORS), requests under
      // /lru-cache on this origin are forwarded to the service on :8082. In
      // production this is the same idea as a reverse-proxy path route.
      '/lru-cache': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lru-cache/, ''),
      },
      // Same idea for the Rate Limiter dashboard, except no rewrite: that app's
      // own vite base + router basename are already "/rate-limiter", so its
      // requests arrive expecting that prefix rather than a stripped path.
      '/rate-limiter': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        ws: true, // Vite HMR websocket for the rate-limiter dev server
      },
    },
  },
})
