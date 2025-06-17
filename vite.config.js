
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // 代理所有 /api 請求到後端
      '/api': {
        target: 'http://localhost:8080', // 替換為你的後端端口
        changeOrigin: true,
        secure: false,
      },
      // 如果你的API沒有 /api 前綴，可以代理所有請求
      // '/': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   secure: false,
      // }
    }
  }
})