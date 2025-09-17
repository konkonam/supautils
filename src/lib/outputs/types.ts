import type { ConfiguredOutput } from '@/types'

export default {
    path: 'types.d.ts',
    clear: true,
    transformers: {
        'transform:string': payload => `${payload.column.name}: string`,
        'transform:number': payload => `${payload.column.name}: number`,
        'transform:boolean': payload => `${payload.column.name}: boolean`,
        'transform:date': payload => `${payload.column.name}: Date`,
        'transform:json': payload => `${payload.column.name}: Record<string, unknown>`,
        'transform:unknown': payload => `${payload.column.name}: unknown`,
        'transform:default': () => '',
        'transform:min': () => '',
        'transform:max': () => '',
        'transform:nullable': () => '',
        'transform:readonly': () => '',
        'transform:table': payload => `export type ${payload.table.name} = {
            ${payload.columns},
        }`,
    },
} satisfies ConfiguredOutput
