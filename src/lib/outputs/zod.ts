import type { ConfiguredOutput } from '@/types'

export default {
    path: 'zod.ts',
    clear: true,
    imports: ['import { z } from "zod"'],
    transformers: {
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
        'transform:readonly': payload => payload.column.readonly ? `Readonly<${payload.current}>` : null,
        'transform:table': payload => `export const ${payload.table.name} = z.object({
            ${payload.columns},
        })`,
    },
} satisfies ConfiguredOutput
