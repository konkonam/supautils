import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { generateOutputs } from './lib/generate'

import zod from '@/lib/outputs/zod'

// Example usage
const outs = await generateOutputs({
    url: 'postgres://postgres:postgres@localhost:54322/postgres',
    tables: ['public.*'],
    outputs: [zod],
}).catch((e) => {
    console.error(e)
})

const outPath = path.resolve(process.cwd(), 'schemas.ts')
await fs.mkdir(path.dirname(outPath), { recursive: true })
await fs.writeFile(outPath, outs[0].content, 'utf8')

console.log(`Wrote ${outPath}`)

export { generateOutputs }
