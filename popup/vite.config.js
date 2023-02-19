import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/production_main.jsx'
    }
  }
  // build: {
  //   lib: {
  //     entry: 'src/chatGPT.js',
  //     name: 'chatGPT',
  //     fileName: 'chatGPT'
  //   }
  // }
  
})
