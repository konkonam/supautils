import type { Config } from '@/lib/config'

import { defaultConfig } from '@/lib/config'
import { makeContext } from '@/lib/context'
import { PostgresMetaWithChecks } from '@/lib/meta'
import { pickColumnTransformer } from './transform'

export type Output = {
    path: string
    content: string
}

export async function generateOutputs(config: Config = defaultConfig) {
    const meta = new PostgresMetaWithChecks({ connectionString: config.url })

    const context = await makeContext(meta, config)

    const outputs: Output[] = []

    for (const configuredOutput of config.outputs) {
        let content = ''

        for (const table of context.tables) {
            const columns = table.columns.map((column) => {
                const transform = pickColumnTransformer(
                    column.type,
                    configuredOutput.transformers,
                )

                return transform({
                    column,
                    transformers: configuredOutput.transformers,
                })
            })

            const result = configuredOutput.transformers['transform:table']({
                table,
                columns: columns.join(',\n'),
            })

            content += result + '\n'
        }

        outputs.push({
            path: configuredOutput.path,
            content,
        })
    }

    await meta.end()

    return outputs
}
