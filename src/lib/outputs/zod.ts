import type { ConfiguredOutput } from '../config'

export default {
    path: 'zod.ts',
    clear: true,
    transformers: {
        'transform:string': payload => `${payload.column.name}: z.string()`,
        'transform:number': payload => `${payload.column.name}: z.number()`,
        'transform:boolean': payload => `${payload.column.name}: z.boolean()`,
        'transform:date': payload => `${payload.column.name}: z.date()`,
        'transform:unknown': payload => `${payload.column.name}: z.unknown()`,
        'transform:default': payload => `.default(${payload.column.default})`,
        'transform:min': payload => `.min(${payload.column.min})`,
        'transform:max': payload => `.max(${payload.column.max})`,
        'transform:table': payload => `export const ${payload.table.name} = z.object({
            ${payload.columns},
        })`,
    },
} satisfies ConfiguredOutput
