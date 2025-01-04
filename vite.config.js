import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $lib: path.resolve('./src/lib'),
            $components: path.resolve('./src/components'),
            $stores: path.resolve('./src/lib/stores'),
            $services: path.resolve('./src/lib/services'),
            $utils: path.resolve('./src/lib/utils'),
            $i18n: path.resolve('./src/lib/i18n')
        }
    }
}); 