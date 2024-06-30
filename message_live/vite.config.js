import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });


export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'] 
  },
  base: '/message_live_app/', 
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.API,
                changeOrigin: true,
        secure: true,
      },
    },
  },
});
