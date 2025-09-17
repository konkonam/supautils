import type { ConfiguredOutput } from '@/types'

export default {
    path: 'api.ts',
    imports: [
        'import * as schema from "./schema"',
        'import { SupabaseError } from "@/lib/errors"',
    ],
    clear: true,
    transformers: {
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
        'transform:table': payload => `
        export const ${payload.table.name}Zod = schema.${payload.table.name}
        export async function get${payload.table.name}(c) {
            const supabase = c.get('supabase')
            const user = c.get('user')

            const { data, error } = await supabase
                .from('${payload.table.name}')
                .select('*')

            if (error) throw new SupabaseError(error)

            return c.json({ data })
        }
        `,
    },
} satisfies ConfiguredOutput
