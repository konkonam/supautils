import type { Context } from '@/lib/context'
import type { Output } from '@/lib/generate'

import { createHooks } from 'hookable'

export type AppHooks = {
    'map:before': (context: Context) => void
    'map:after': (context: Context) => void
    'write:before': (output: Output) => void
    'write:after': (file: string, content: string) => void
}

export const appHooks = createHooks<AppHooks>()
