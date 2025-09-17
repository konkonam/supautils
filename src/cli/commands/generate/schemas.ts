import { loadConfigFromArgs } from '@/lib/config'
import { generateOutputs, writeOutputs } from '@/lib/generate'

import { defineCommand } from 'citty'
import defu from 'defu'

export default defineCommand({
    meta: {
        name: 'schemas',
        description: 'Generate Zod schemas from Supabase/Postgres',
    },
    args: {
        schemas: {
            type: 'string',
            description: 'Schemas to generate',
            valueHint: 'a,b,c...',
            default: 'public',
        },
        url: {
            type: 'string',
            description: 'Database connection string to override auto-detection',
            valueHint: 'postgres://...',
        },
    },
    async run({ args }) {
        const config = await loadConfigFromArgs(defu(args, {
            outputDir: './generated/cli',
        }))

        const outputs = await generateOutputs(config)

        await writeOutputs(outputs)
    },
})
