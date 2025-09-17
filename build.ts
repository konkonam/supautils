import { build } from 'bun'

await build({
    entrypoints: [
        './src/index.ts',
        './src/cli/index.ts',
    ],
    outdir: './dist',
    target: 'node',
    format: 'esm',
    // @ts-expect-error this is actually working
    splitting: true,
    sourcemap: 'external',
    minify: false,
})
