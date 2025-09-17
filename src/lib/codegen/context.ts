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

    registerHooks(config)

    const includes = string.processTables(config.tables)

    const tables = await meta.tables.list({
        includeColumns: true,
        includedSchemas: Object.keys(includes),
    }).then(({ data, error }) => {
        if (error) throw error

        const tables = data ?? []

        return tables.filter((t: PostgresTable) => {
            const allowed = includes[t.schema]
            if (allowed === undefined) return true
            if (allowed && allowed.includes(t.name)) return true
            return false
        })
    })

    const checks = await meta.checks(Object.keys(includes)).then(({ data, error }) => {
        if (error) throw error

        const rows = (data ?? []) as PostgresCheck[]

        return rows.filter((t: PostgresCheck) => {
            const allowed = includes[t.schema_name as keyof typeof includes]
            if (allowed === undefined) return true
            if (allowed && allowed.includes(t.table_name)) return true
            return false
        })
    })

    await appHooks.callHook('map:before', context)
    context.tables = mapTables(tables, checks)
    await appHooks.callHook('map:after', context)

    return context
}
