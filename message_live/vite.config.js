import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    base: '/message_live_app/',
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.API,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    define: {
      'process.env.API': JSON.stringify(env.API),
    },
  };
});
