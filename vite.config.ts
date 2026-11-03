import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/CPNEW/',
  build: { target: 'esnext', chunkSizeWarningLimit: 1500 },
  server: { port: 3000 },
})
