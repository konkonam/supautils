import type { MappedTable, Config } from '@/types'
import type { PostgresMetaWithChecks, PostgresTable, PostgresCheck } from '@/lib/db'

import { mapTables } from '@/lib/codegen'
import { appHooks, registerHooks } from '@/lib/hooks'
import * as string from '@/utils/string'

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
        hook: appHooks.hook,
    }

    context.config.tables = Array.from(new Set(context.config.tables))

    registerHooks(context.config)

    const includes = string.processTables(context.config.tables)

    let tables = await meta.tables.list({
        includeColumns: true,
        includedSchemas: Object.keys(includes),
    }).then(({ data, error }) => {
        if (error) console.error(error)

        return data ?? []
    })

    tables = tables.filter((t: PostgresTable) => {
        const allowedTables = includes[t.schema]
        if (allowedTables === null)
            return true
        else if (allowedTables && Array.isArray(allowedTables))
            return allowedTables.includes(t.name)

        return false
    })

    let checks = await meta.checks(Object.keys(includes)).then(({ data, error }) => {
        if (error) console.error(error)

        return data ?? []
    })

    checks = checks.filter((t: PostgresCheck) => {
        const allowedTables = includes[t.schema_name as keyof typeof includes]
        if (allowedTables === null)
            return true
        else if (allowedTables && Array.isArray(allowedTables))
            return allowedTables.includes(t.table_name)

        return false
    })

    await appHooks.callHook('map:before', context)
    context.tables = mapTables(tables, checks)
    await appHooks.callHook('map:after', context)

    return context
}
