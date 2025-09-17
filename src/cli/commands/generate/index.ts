import { defineCommand } from 'citty'

export default defineCommand({
    meta: {
        name: 'gen',
        description: 'Generate files directly from Supabase/Postgres',
    },

    subCommands: {
        schemas: () => import('./schemas').then(r => r.default),
    },
})
