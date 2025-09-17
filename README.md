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

#### Options

- `--out` or `--output`: Output file path
- `--url`: Database connection string
- `--schemas`: Schemas to generate

### Code

```ts
import { generateOutputs, writeOutputs } from 'supautils'

const outputs = await generateOutputs({
    url: 'postgres://user:pass@host:port/db',
    outputDir: './generated/cli',
    schemas: ['public'],
})

await writeOutputs(outputs)
