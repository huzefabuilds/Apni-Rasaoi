import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes on local network so phone on same Wi-Fi can open it
    port: 5173,
    open: false
  }
});
