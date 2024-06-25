import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  proxy : {
    '/api':{
      target :'https://message-live-app.onrender.com',
      secure: true,      
    }
  },
  plugins: [react()],
})
