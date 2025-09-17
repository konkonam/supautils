/**
 * A mapped PostgresColumn
 */
export type MappedColumn = {
    name: string
    type: string
    min?: string
    max?: string
    nullable: boolean
    readonly: boolean
    default?: string
}

/**
 * A mapped PostgresTable
 */
export type MappedTable = {
    name: string
    columns: MappedColumn[]
    dependencies: string[]
}
