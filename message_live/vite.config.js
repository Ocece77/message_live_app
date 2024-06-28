import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'] 
  },

   build: {
    outDir: 'dist', // Assurez-vous que c'est le bon chemin de sortie
  },
  base: '/message_live/', 
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
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
