import type { Transformers } from '@/types'
import type { AppHooks } from '@/lib/hooks'

export type ConfiguredOutput = {
    path: string
    clear?: boolean
    imports?: string[]
    transformers: Transformers
}

export type Config = {
    url: string
    tables: string[]
    outputDir?: string
    hooks?: Partial<{
        [K in keyof AppHooks]: AppHooks[K] | AppHooks[K][]
    }>
    outputs: ConfiguredOutput[]
}
