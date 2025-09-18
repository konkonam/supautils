import type { CommandDef } from 'citty'
import { defineCommand, runMain } from 'citty'

import { consola } from 'consola'

import * as pkg from '../../package.json' assert { type: 'json' }

consola.wrapConsole()

const main: CommandDef = defineCommand({
    meta: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
    },
    subCommands: {
        'gen:schemas': () => import('./commands/generate/schemas').then(r => r.default),
    },
})

export default main

// when called directly
runMain(main)
