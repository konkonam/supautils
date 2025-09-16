import { defineCommand, runMain } from 'citty'

const main = defineCommand({
    meta: {
        name: 'supautils',
        version: '0.1.0',
        description: 'Utilities to generate Zod schemas from Supabase/Postgres',
    },
    subCommands: {
        gen: () => import('./commands/generate').then(r => r.default),
    },
})

export default main

// Execute when called directly
runMain(main)
