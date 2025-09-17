import type { Config, Output } from '@/types'
import type { Context } from '@/lib/codegen'

import { createHooks } from 'hookable'

export type AppHooks = {
    'map:before': (context: Context) => void
    'map:after': (context: Context) => void
    'write:before': (output: Output) => void
    'write:after': (output: Output) => void
}

export const appHooks = createHooks<AppHooks>()

// Register hooks provided via config
export function registerHooks(config: Config) {
    if (!config.hooks) return

    for (const event of Object.keys(config.hooks) as (keyof AppHooks)[]) {
        const handlers = config.hooks[event]
        if (!handlers) continue
        const arr = Array.isArray(handlers) ? handlers : [handlers]
        for (const h of arr) {
            appHooks.hook(event, h)
        }
    }
}
