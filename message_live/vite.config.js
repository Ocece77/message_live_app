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
  base: "https://message-live-2udx2nb55-ocece77s-projects.vercel.app",

})
