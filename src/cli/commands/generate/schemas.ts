import { loadConfigFromArgs } from '@/lib/config'
import { generateOutputs, writeOutputs } from '@/lib/codegen'

import type { CommandDef } from 'citty'
import { defineCommand } from 'citty'

const command: CommandDef = defineCommand({
    meta: {
        name: 'gen:schemas',
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
            default: 'postgres://postgres:postgres@localhost:54322/postgres',
        },
        outputDir: {
            type: 'string',
            description: 'Output directory for generated files',
            valueHint: 'path/to/output',
            default: './generated',
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

export default command
