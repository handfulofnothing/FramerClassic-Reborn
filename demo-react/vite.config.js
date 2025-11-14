import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: [
      '416612245209.ngrok-free.app',
      '270f9ae5210e.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
});
