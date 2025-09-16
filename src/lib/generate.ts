import type { Config } from '@/lib/config'

import { defaultConfig } from '@/lib/config'
import { makeContext } from '@/lib/context'
import { PostgresMetaWithChecks } from '@/lib/meta'

export type Output = {
    path: string
    content: string
}

export async function generateOutputs(config: Config = defaultConfig) {
    const meta = new PostgresMetaWithChecks({ connectionString: config.url })

    const context = await makeContext(meta, config)
    console.log(context.tables)

    const outputs: Output[] = []

    const content = `
    ${context.tables.map(table => `export const ${table.name} = z.object({
        ${table.columns.map(column => `${column.name}: ${column.type}`).join(',\n        ')},
    })`).join('\n')}
    `

    outputs.push({
        path: 'schemas.ts',
        content,
    })

    await meta.end()

    return outputs
}
