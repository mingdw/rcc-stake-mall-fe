import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' //导入Path模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
      // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 配置 @ 别名指向 src 文件夹
    }
  }
})

