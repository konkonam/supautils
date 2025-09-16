import { createHooks } from 'hookable'

export type AppHooks = {
    hello: () => void
    ready: (message: string) => void
    beforeSave: (data: { id: number }) => Promise<void> | void
}

export const hooks = createHooks<AppHooks>()
