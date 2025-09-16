import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { defineCommand } from 'citty'
import consola from 'consola'

import { loadConfigFromArgs } from '@/lib/config'
import { generateOutputs } from '@/lib/generate'

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
        const config = await loadConfigFromArgs({
            url: args.url,
            schemas: args.schemas,
        })

        const outputs = await generateOutputs(config)

        const outPath = path.resolve(process.cwd(), String(args.out))
        await fs.mkdir(path.dirname(outPath), { recursive: true })
        await fs.writeFile(outPath, outputs[0].content, 'utf8')

        consola.success(`Wrote ${outPath}`)
    },
})
