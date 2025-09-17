import { build } from 'bun'

await build({
    outdir: './dist',
    target: 'node',
    format: 'esm',
    minify: true,
    sourcemap: 'linked',
    entrypoints: [
        './src/lib/codegen/index.ts',
        './src/lib/db/index.ts',
        './src/lib/outputs/api.ts',
        './src/lib/outputs/types.ts',
        './src/lib/outputs/zod.ts',
        './src/index.ts',
        './src/cli/index.ts',
    ],
    external: [
        '@supabase/postgres-meta',
        'citty',
        'consola',
        'defu',
        'execa',
        'hookable',
        'pg',
        'toml',
        'zod',
    ],
    // @ts-expect-error this is actually working
    splitting: true,
})
