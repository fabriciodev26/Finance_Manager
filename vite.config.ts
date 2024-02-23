import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@css': path.resolve(__dirname, './src/css'),
      '@store': path.resolve(__dirname, './src/store'),
      '@transactions': path.resolve(__dirname, './src/transactions'),
    }
  }
})
