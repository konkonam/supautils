import { defineCommand, runMain } from 'citty'

import { consola } from 'consola'

consola.wrapConsole()

const main = defineCommand({
    meta: {
        name: 'supautils',
        version: '0.1.0',
        description: 'Utilities to generate Zod schemas from Supabase/Postgres',
    },
    subCommands: {
        'gen:schemas': () => import('./commands/generate/schemas').then(r => r.default),
    },
})

export default main

// when called directly
runMain(main)
