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
