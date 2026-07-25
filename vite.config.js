import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ignore specific files that may be locked by other processes (Windows EBUSY errors)
  server: {
    watch: {
      // glob relative to workspace root
      ignored: ['**/public/SVG.png', '**/public/SVG (1).svg']
    }
  }
})
