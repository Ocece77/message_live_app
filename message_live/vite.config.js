import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  proxy : {
    '/api':{
      target :'http://http://localhost:3000',
      secure: true,      
    }
  },
  plugins: [react()],
  base: "https://message-live-app.vercel.app",

})
