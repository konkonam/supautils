import type { ConfiguredOutput } from '@/types'

import { toCamelCase } from '@/utils/string'

export default {
    path: 'api.ts',
    imports: [
        'import * as schema from "./schema"',
    ],
    clear: true,
    transformers: {
        'transform:tablename': name => toCamelCase(name),
        'transform:columnname': name => toCamelCase(name),
        'transform:string': () => '',
        'transform:number': () => '',
        'transform:boolean': () => '',
        'transform:date': () => '',
        'transform:json': () => '',
        'transform:unknown': () => '',
        'transform:default': () => '',
        'transform:min': () => '',
        'transform:max': () => '',
        'transform:nullable': () => '',
        'transform:readonly': () => '',
        'transform:table': payload => `export const ${payload.table.name}Schema = schema.${payload.table.name}`,
    },
} satisfies ConfiguredOutput
