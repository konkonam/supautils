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

const outputs = await generateOutputs({
    url: 'postgres://user:pass@host:port/db',
    outputDir: './generated/cli',
    schemas: ['public'],
})

await writeOutputs(outputs)
