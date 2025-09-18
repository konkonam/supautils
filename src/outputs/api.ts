import type { ConfiguredOutput } from '@/types'

import { decapitalize, toCamelCase } from '@/utils/string'

const output: ConfiguredOutput = {
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
        'transform:table': payload => `export const ${payload.table.name}Schema = schema.${decapitalize(payload.table.name)}`,
    },
}

export default output
