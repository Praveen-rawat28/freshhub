import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/dist_backup/**', '**/android/**']
    }
  },
  optimizeDeps: {
    exclude: ['dist_backup']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
