import type { ConfiguredOutput } from '@/types'

import { decapitalize, toCamelCase } from '@/utils/string'

const output: ConfiguredOutput = {
    path: 'api.ts',
    imports: [
        'import * as schemas from "./schemas"',
    ],
    clear: true,
    transformers: {
        'transform:tablename': name => decapitalize(toCamelCase(name)),
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
        'transform:table': ({ table }) => `export const ${table.name}Schema = schemas.${table.name}`,
    },
}

export default output
