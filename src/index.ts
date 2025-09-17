import { execa } from 'execa'
import { generateOutputs } from './lib/generate'

import zod from '@/lib/outputs/zod'
import types from '@/lib/outputs/types'

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
            await execa('bunx', ['eslint', output.path, '--fix']).catch(() => {})
        },
    },
    outputs: [zod, types],
}).catch((e) => {
    console.error(e)
    return []
})

export { generateOutputs }
