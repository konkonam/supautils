Utilities i commonly need for supabase projects to help me build saas products faster

## Installation

```bash
npm i supautils -D
```

## Usage

### CLI

```bash
npx supautils gen:schemas
```

| Option | Description | Default |
| --- | --- | --- |
| `--out` or `--output` | Output file path | `./generated/cli` |
| `--url` | Database connection string | `DATABASE_URL` env variable |
| `--schemas` | Schemas to generate | `public` |

### Code

```ts
import { generateOutputs, writeOutputs } from 'supautils'
import { execa, ExecaError } from 'execa'
import { basename } from 'node:path'

const outs = await generateOutputs({
    url: 'postgres://postgres:postgres@localhost:54322/postgres',
    tables: [
        'public.*',
        'auth.users',
    ],
    outputDir: './generated/lib',
    hooks: {
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
            catch (error) {
                if (error instanceof ExecaError) {
                    console.info('File', basename(output.path), 'contains linting errors')
                }
            }
        },
    },
}).catch(() => {
    return []
})

writeOutputs(outs)
