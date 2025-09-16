import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { defineCommand } from 'citty'
import consola from 'consola'

import { loadConfigFromArgs } from '@/lib/config'
import { generateOutputs } from '@/lib/generate'

export default defineCommand({
    meta: {
        name: 'gen',
        description: 'Generate files directly from Supabase/Postgres',
    },

    subCommands: {
        schemas: () => import('./schemas').then(r => r.default),
    },
    async run({ args }) {
        const config = await loadConfigFromArgs(args)

        const outputs = await generateOutputs(config)

        const outPath = path.resolve(process.cwd(), String(args.out))
        await fs.mkdir(path.dirname(outPath), { recursive: true })
        await fs.writeFile(outPath, outputs[0].content, 'utf8')

        consola.success(`Wrote ${outPath}`)
    },
})
