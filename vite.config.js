import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dòng này cực kỳ quan trọng để sửa lỗi 404 trên Vercel/GitHub Pages
  base: './', 
})
