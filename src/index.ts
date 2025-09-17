import { generateOutputs, writeOutputs } from '@/lib/codegen'

import { execa } from 'execa'

// Example usage
const outs = await generateOutputs({
    url: 'postgres://postgres:postgres@localhost:54322/postgres',
    tables: [
        'public.*',
        'auth.users',
    ],
    outputDir: './generated/lib',
    hooks: {
        'write:after': async (output) => {
            console.log(`Running eslint on ${output.path}`)
            await execa('bunx', ['eslint', output.path, '--fix'])
        },
    },
}).catch((e) => {
    console.error(e)
    return []
})

writeOutputs(outs)

export { generateOutputs, writeOutputs }
