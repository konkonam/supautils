import { toCamelCase } from '@/utils/string'
import type { PostgresTable } from '@supabase/postgres-meta'

type FieldParams = {
    table: PostgresTable
    field: PostgresTable['columns'][number]
}

export default function transformField({ table, field }: FieldParams) {
    switch (field.data_type) {
        case 'text': {
            return makeString({ table, field })
        }
        case 'integer': {
            return makeNumber({ table, field })
        }
        case 'boolean': {
            return makeBoolean({ table, field })
        }
        case 'timestamp': {
            return makeDate({ table, field })
        }
        default: {
            return `z.unknown()`
        }
    }
}

export function transformTable({ table }: FieldParams) {
    return `export const ${toCamelCase(table.name)} = z.object({
        ${table.columns.map(field => `${toCamelCase(field.name)}: ${transformField({ table, field })}`).join(',\n        ')}
    })`
}
