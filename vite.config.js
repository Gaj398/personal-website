import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    // GitHub Pages 部署在 /personal-website/ 子路径，必须显式设置 base
    base: '/personal-website/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                },
            },
        },
        sourcemap: false,
    },
    server: {
        port: 3000,
        open: true,
    },
});
