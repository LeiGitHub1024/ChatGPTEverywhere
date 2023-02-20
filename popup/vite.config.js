import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      input: 'src/production_main.jsx',
      cssCodeSplit: false,
      assetsDir: '',
      output: {
        format: 'iife',
        entryFileNames: 'chatgpttooltip-injected-by-alyosha1024.js',
        chunkFileNames: '[name].js'
      },
    },
  },
  // build: {
  //   lib: {
  //     entry: 'src/chatGPT.js',
  //     name: 'chatGPT',
  //     fileName: 'chatGPT'
  //   }
  // }
  
})
