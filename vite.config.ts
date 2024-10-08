/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'library-classnames',
            fileName: (format) => `library-classnames.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            input: 'src/index.ts',
        }
    },
    server: {
        open: true,
    },
    test: {
        setupFiles: './src/classNames.test.ts'
    }
});