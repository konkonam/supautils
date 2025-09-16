import { type PostgresColumn, type PostgresTable, PostgresMeta } from '@supabase/postgres-meta'

type PostgresCheck = {
    constraint_name: string
    definition: string
    table_name: string
    column_name: string | null
}

export class PostgresMetaWithChecks extends PostgresMeta {
    async checks(includedSchemas: string[]): Promise<{ data: PostgresCheck[], error: unknown }> {
        const schemaList = includedSchemas.map(s => `'${s}'`).join(', ')

        const sql = `
      SELECT 
        con.conname AS constraint_name,
        pg_get_constraintdef(con.oid) AS definition,
        nsp.nspname AS schema_name,
        tbl.relname AS table_name,
        col.attname AS column_name
      FROM pg_constraint con
      JOIN pg_class tbl 
        ON con.conrelid = tbl.oid
      JOIN pg_namespace nsp 
        ON tbl.relnamespace = nsp.oid
      LEFT JOIN pg_attribute col 
        ON col.attnum = ANY (con.conkey)
       AND col.attrelid = tbl.oid
      WHERE con.contype = 'c'
        AND nsp.nspname IN (${schemaList});
    `

        return this.query(sql)
    }
}

export type { PostgresColumn, PostgresTable, PostgresMeta, PostgresCheck }
