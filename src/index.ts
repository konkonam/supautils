import { generateOutputs } from './lib/generate'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import consola from 'consola'

// Example usage
const outs = await generateOutputs({
    url: 'postgres://postgres:postgres@localhost:54322/postgres',
    schemas: ['public'],
    outputs: [],
}).catch((e) => {
    console.error(e)
})

const outPath = path.resolve(process.cwd(), 'schemas.ts')
await fs.mkdir(path.dirname(outPath), { recursive: true })
await fs.writeFile(outPath, outs[0].content, 'utf8')

consola.success(`Wrote ${outPath}`)

export { generateOutputs }
