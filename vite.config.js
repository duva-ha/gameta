import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gameta/', // Thay 'gameta' bằng tên repository của bạn
})
