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
    dependencies: string[]
}

/**
 * Extracts the default value from a column
 */
export function extractDefault(column: PostgresColumn) {
    if (!column.default_value) return null

    return String(column.default_value)
}

/**
 * Extracts the min value from a column and its checks
 */
export function extractMin(column: PostgresColumn, checks: PostgresCheck[]) {
    const relevant = checks.filter(c => c.column_name === column.name)

    for (const check of relevant) {
        const match = check.definition.match(
            new RegExp(`${column.name}\\s*>=?\\s*([\\d.'-]+)`, 'i'),
        )
        if (match) return match[1]
    }
}

/**
 * Extracts the max value from a column and its checks
 */
export function extractMax(column: PostgresColumn, checks: PostgresCheck[]) {
    const relevant = checks.filter(c => c.column_name === column.name)

    for (const check of relevant) {
    // Match things like: column <= 10  OR  column < 10
        const match = check.definition.match(
            new RegExp(`${column.name}\\s*<=?\\s*([\\d.'-]+)`, 'i'),
        )
        if (match) return match[1]
    }
}

/**
 * Extracts the dependencies from a table
 */
export function extractTableDependencies(table: PostgresTable) {
    const dependencies = []

    table.relationships?.forEach(({ target_table_name }) => {
        dependencies.push(target_table_name)
    })

    console.log(dependencies)

    return dependencies
}

/**
 * Converts PostgresColumn to MappedColumn
 */
export function mapColumn(column: PostgresColumn, tableChecks: PostgresCheck[]): MappedColumn {
    const checks = tableChecks.filter(check => check.column_name === column.name)

    const defaultValue = extractDefault(column)
    const min = extractMin(column, checks)
    const max = extractMax(column, checks)

    return {
        name: column.name,
        type: column.data_type,
        nullable: column.is_nullable,
        default: defaultValue,
        min,
        max,
    }
}

/**
 * Converts PostgresTable to MappedTable
 */
export function mapTable(table: PostgresTable, allChecks: PostgresCheck[]) {
    const checks = allChecks.filter(check => check.table_name === table.name)
    const columns = table.columns.map(column => mapColumn(column, checks))

    const dependencies = extractTableDependencies(columns)

    return {
        name: table.name,
        columns,
        // Dependencies are other tables that are referenced by this table
        // @TODO: add foreign keys, enums, etc.
        dependencies,
    } satisfies MappedTable
}

/**
 * Converts PostgresTable[] to MappedTable[]
 */
export function mapTables(tables: PostgresTable[], checks: PostgresCheck[]) {
    return tables.map(table => mapTable(table, checks))
}
