import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // fail if port is not available
    host: true        // needed to expose to external network
  },
  build: {
    outDir: 'dist'    // ensure output goes to dist folder
  },
  preview: {
    port: 4173,
    host: true
  }
});
