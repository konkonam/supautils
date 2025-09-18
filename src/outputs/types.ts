import type { ConfiguredOutput } from '@/types'
import { toPascalCase, toCamelCase, decapitalize } from '@/utils/string'

const output: ConfiguredOutput = {
    path: 'types.d.ts',
    clear: true,
    imports: [
        'import * as schemas from "./schemas"',
        'import type { z } from "zod"',
    ],
    transformers: {
        'transform:tablename': name => toPascalCase(name),
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
        'transform:table': payload => `export type ${payload.table.name} = z.infer<typeof schemas.${decapitalize(payload.table.name)}>`,
    },
}

export default output
