import type { PostgresColumn, PostgresTable, PostgresCheck } from '@/lib/meta'

export type MappedColumn = {
    name: string
    type: string
    min?: string
    max?: string
    nullable: boolean
    default?: string
}

export type MappedTable = {
    name: string
    columns: MappedColumn[]
}

export function extractDefault(column: PostgresColumn) {
    if (!column.default_value) return null

    return column.default_value
}

export function extractMin(column: PostgresColumn, checks: PostgresCheck[]) {
    const relevant = checks.filter(c => c.column_name === column.name)

    for (const check of relevant) {
        const match = check.definition.match(
            new RegExp(`${column.name}\\s*>=?\\s*([\\d.'-]+)`, 'i'),
        )
        if (match) return match[1]
    }
    return null
}

export function extractMax(column: PostgresColumn, checks: PostgresCheck[]) {
    const relevant = checks.filter(c => c.column_name === column.name)

    for (const check of relevant) {
    // Match things like: column <= 10  OR  column < 10
        const match = check.definition.match(
            new RegExp(`${column.name}\\s*<=?\\s*([\\d.'-]+)`, 'i'),
        )
        if (match) return match[1]
    }
    return null
}

export function mapColumn(column: PostgresColumn, tableChecks: PostgresCheck[]): MappedColumn {
    const checks = tableChecks.filter(check => check.column_name === column.name)

    const min = extractMin(column, checks)
    const max = extractMax(column, checks)

    return {
        name: column.name,
        type: column.data_type,
        nullable: column.is_nullable,
        min,
        max,
        default: String(column.default_value),
    }
}

export function mapTable(table: PostgresTable, allChecks: PostgresCheck[]) {
    const checks = allChecks.filter(check => check.table_name === table.name)

    return {
        name: table.name,
        columns: table.columns.map(column => mapColumn(column, checks)),
    } satisfies MappedTable
}

export function mapTables(tables: PostgresTable[], checks: PostgresCheck[]) {
    return tables.map(table => mapTable(table, checks))
}
