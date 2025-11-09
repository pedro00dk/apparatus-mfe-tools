import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: { entry: ['./src/index.ts', './src/plugin.ts'], formats: ['es'] },
        rollupOptions: { external: ['node:fs', 'vite', 'rollup', 'magic-string'] },
        minify: false,
    },
})
