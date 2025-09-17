import { generateOutputs, writeOutputs } from 'supautils'
import { basename } from 'node:path'
import { consola } from 'consola'
import { execa } from 'execa'

consola.wrapConsole()

const outs = await generateOutputs({
    url: 'postgres://postgres:postgres@localhost:54322/postgres',
    tables: [
        'public.*',
        'auth.users',
    ],
    outputDir: './generated/lib',
    hooks: {
        'map:before': async () => {},
        'map:after': async () => {},
        'write:before': async () => {},
        'write:after': async (output) => {
            try {
                await execa('bunx', [
                    'eslint',
                    '--fix',
                    '--no-ignore',
                    '--exit-on-fatal-error',
                    output.path.replace(process.cwd(), '.'),
                ])
            }
            catch {
                console.info('File', basename(output.path), 'contains linting errors')
            }
        },
    },
}).catch(() => {
    return []
})

writeOutputs(outs)
