import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    declaration: true,
    failOnWarn: false,

    entries: [

        'src/index.ts',
        {
            name: 'cli',
            input: 'src/cli/index.ts',
            format: 'esm',
            ext: 'mjs',
        },
    ],

    replace: {
        ROLLUP_REPLACE_VIRTUAL_MODULES: 'false',
    },
})
