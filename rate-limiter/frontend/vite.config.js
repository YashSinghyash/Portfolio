import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set now (rather than left default) because Phase 5 mounts this app
// under /rate-limiter on the portfolio's own domain, same reverse-proxy
// pattern as the LRU Cache Service project -- setting it early avoids
// reworking asset/router paths later.
export default defineConfig({
  base: '/rate-limiter/',
  plugins: [react()],
  server: {
    port: 5174,
  },
})
