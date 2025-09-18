import type { ConfiguredOutput } from '@/types'

import { toCamelCase } from '@/utils/string'

const output: ConfiguredOutput = {
    path: 'schemas.ts',
    clear: true,
    imports: ['import { z } from "zod"'],
    transformers: {
        'transform:tablename': name => toCamelCase(name),
        'transform:columnname': name => toCamelCase(name),
        'transform:string': payload => `${payload.column.name}: z.string()`,
        'transform:number': payload => `${payload.column.name}: z.number()`,
        'transform:boolean': payload => `${payload.column.name}: z.boolean()`,
        'transform:date': payload => `${payload.column.name}: z.date()`,
        'transform:json': payload => `${payload.column.name}: z.record(z.string(), z.unknown())`,
        'transform:unknown': payload => `${payload.column.name}: z.unknown()`,
        'transform:default': () => '',
        'transform:min': payload => `.min(${payload.column.min})`,
        'transform:max': payload => `.max(${payload.column.max})`,
        'transform:nullable': payload => payload.column.nullable ? `.nullable()` : '',
        'transform:readonly': payload => payload.column.readonly ? `.readonly()` : '',
        'transform:table': payload => `
        export const ${payload.table.name} = z.object({
            ${payload.columns},
        })`,
    },
}

export default output
