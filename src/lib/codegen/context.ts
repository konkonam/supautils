import type { MappedTable, Config } from '@/types'
import type { PostgresMetaWithChecks } from '@/lib/meta'

import { mapTables } from '@/lib/codegen'
import { appHooks, registerHooks } from '@/lib/hooks'
import * as string from '@/utils/string'

export interface Context {
    meta: PostgresMetaWithChecks
    config: Config
    tables: MappedTable[]
    hook: typeof appHooks['hook']
}

/**
 * Filters tables based on the included tables from the config
 */
export const filterTables = (allowed: string[] | null, name: string): boolean => {
    if (allowed === null) return true
    if (!Array.isArray(allowed)) return false
    return allowed.includes(name)
}

/**
 * Creates a context from the given PostgresMeta and Config
 */
export async function makeContext(
    meta: PostgresMetaWithChecks,
    config: Config,
): Promise<Context> {
    const context: Context = {
        meta,
        config,
        tables: [],
        hook: appHooks.hook,
    }

    context.config.tables = Array.from(new Set(context.config.tables))

    registerHooks(context.config)

    // Process tables from the config to an easier format
    const includes = string.processTables(context.config.tables)

    // Get database tables from pg
    const tables = await meta.tables.list({
        includeColumns: true,
        includedSchemas: Object.keys(includes),
    }).then(({ data, error }) => {
        if (error) console.error(error)

        return data?.filter(t => filterTables(includes[t.schema], t.name)) ?? []
    }).catch((e) => {
        console.error(e)
        return []
    })

    // Get database constraints(checks) from pg
    const checks = await meta.checks(Object.keys(includes)).then(({ data, error }) => {
        if (error) console.error(error)

        return data?.filter(t => filterTables(includes[t.schema_name], t.table_name)) ?? []
    }).catch((e) => {
        console.error(e)
        return []
    })

    await appHooks.callHook('map:before', context)
    context.tables = mapTables(tables, checks)
    await appHooks.callHook('map:after', context)

    return context
}
