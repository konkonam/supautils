import { build } from 'bun'

await build({
    entrypoints: [
        './src/lib/codegen/index.ts',
        './src/lib/db/index.ts',
        './src/lib/outputs/api.ts',
        './src/lib/outputs/types.ts',
        './src/lib/outputs/zod.ts',
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
