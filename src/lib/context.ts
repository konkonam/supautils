import type { PostgresMetaWithChecks } from '@/lib/meta'
import type { Config } from '@/lib/config'

import { mapTables, type MappedTable } from '@/lib/map'
import { appHooks } from '@/lib/hooks'

export interface Context {
    meta: PostgresMetaWithChecks
    config: Config
    tables: MappedTable[]
    hook: typeof appHooks['hook']
}

export async function makeContext(
    meta: PostgresMetaWithChecks,
    config: Config,
): Promise<Context> {
    const context: Context = {
        meta,
        config,
        tables: [],
        hook: appHooks.hook.bind(appHooks),
    }

    const tables = await meta.tables.list({
        includeColumns: true,
        includedSchemas: config.schemas,
    }).then(({ data, error }) => {
        if (error) throw error

        return data ?? []
    })

    const checks = await meta.checks(config.schemas).then(({ data, error }) => {
        if (error) throw error

        return data ?? []
    })

    context.tables = mapTables(tables, checks)

    return context
}
