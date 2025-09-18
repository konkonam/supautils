import type { MappedColumn, MappedTable } from '@/types'
import type { PostgresColumn, PostgresTable, PostgresCheck } from '@/lib/meta'

/**
 * Extracts the default value from a column
 */
export function extractDefault(column: PostgresColumn): string | null {
    if (!column.default_value) return null

    return String(column.default_value)
}

/**
 * Extracts the min value from a column and its checks
 */
export function extractMin(column: PostgresColumn, checks: PostgresCheck[]): string | null {
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
export function extractMax(column: PostgresColumn, checks: PostgresCheck[]): string | null {
    const relevant = checks.filter(c => c.column_name === column.name)

    for (const check of relevant) {
    // Match things like: column <= 10  OR  column < 10
        const match = check.definition.match(
            new RegExp(`${column.name}\\s*<=?\\s*([\\d.'-]+)`, 'i'),
        )
        if (match) return match[1]
    }
}

export function extractNullable(column: PostgresColumn): boolean {
    return column.is_nullable
}

export function extractReadOnly(table: PostgresTable, column: PostgresColumn): boolean {
    const isReferenced = table.relationships?.some(({ target_table_name }) => target_table_name === column.name)

    return isReferenced || column.is_generated || column.is_identity
}

/**
 * Extracts the dependencies from a table
 */
export function extractTableDependencies(table: PostgresTable): string[] {
    const dependencies = []

    table.relationships?.forEach(({ target_table_name }) => {
        dependencies.push(target_table_name)
    })

    return dependencies
}

/**
 * Converts PostgresColumn to MappedColumn
 */
export function mapColumn(table: PostgresTable, column: PostgresColumn, tableChecks: PostgresCheck[]): MappedColumn {
    const checks = tableChecks.filter(check => check.column_name === column.name)

    const result = {
        name: column.name,
        type: column.data_type,
        nullable: extractNullable(column),
        readonly: extractReadOnly(table, column),
        default: extractDefault(column),
        min: extractMin(column, checks),
        max: extractMax(column, checks),
    }

    return result
}

/**
 * Converts PostgresTable to MappedTable
 */
export function mapTable(table: PostgresTable, allChecks: PostgresCheck[] | undefined): MappedTable {
    const checks = allChecks?.filter(check => check.table_name === table.name)
    const columns = table.columns.map(column => mapColumn(table, column, checks))

    const dependencies = extractTableDependencies(table)

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
export function mapTables(tables: PostgresTable[], checks: PostgresCheck[]): MappedTable[] {
    return tables.map(table => mapTable(table, checks))
}
