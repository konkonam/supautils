import { loadConfigFromArgs } from '@/lib/config'
import { generateOutputs, writeOutputs } from '@/lib/codegen'

import { defineCommand } from 'citty'

export default defineCommand({
    meta: {
        name: 'schemas',
        description: 'Generate Zod schemas from Supabase/Postgres',
    },
    args: {
        tables: {
            type: 'string',
            description: 'Tables to generate',
            valueHint: 'a.*|b.a,c.*...',
            default: 'public.*',
        },
        url: {
            type: 'string',
            description: 'Database connection string to override auto-detection',
            valueHint: 'postgres://...',
        },
    },
    async run({ args }) {
        const config = await loadConfigFromArgs(args)

        const outs = await generateOutputs(config).catch((e) => {
            console.error(e)
            return []
        })

        writeOutputs(outs)
    },
})
