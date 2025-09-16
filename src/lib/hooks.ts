import { createHooks } from 'hookable'

export type AppHooks = {
    beforeOutput: (output: string) => void
    ready: (message: string) => void
    beforeSave: (data: { id: number }) => Promise<void> | void
}

export type OutputHooks = {
    transformSring: (output: string) => void
    transformNumber: (output: string) => void
    transformUnknown: (output: string) => void
}

export const appHooks = createHooks<AppHooks>()
export const outputHooks = createHooks<OutputHooks>()
