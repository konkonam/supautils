import type { AppHooks, OutputHooks } from '@/lib/hooks'

import * as array from '@/utils/array'
import { getDbUrlFromCli } from '@/lib/supabase'
import defu from 'defu'

export type ConfiguredOutput = {
    path: string
    clear: boolean
    hooks?: Partial<{
        [K in keyof OutputHooks]: OutputHooks[K] | OutputHooks[K][]
    }>
}

export type Config = {
    url: string
    schemas: string[]
    hooks?: Partial<{
        [K in keyof AppHooks]: AppHooks[K] | AppHooks[K][]
    }>
    outputs: ConfiguredOutput[]
}

/**
 * Default config
 */
export const defaultConfig: Config = {
    url: 'postgres://postgres:postgres@localhost:5432/postgres',
    schemas: ['public'],
    outputs: [],
}

/**
 * Read a secret from env or throw
 */
export function readSecret(key: string) {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Missing secret: ${key}`)
    }

    return value
}

/**
 * Load config from environment variables
 */
export function loadConfigFromEnv(): Config {
    return {
        url: readSecret('SUPABASE_DB_URL'),
        schemas: array.fromString(readSecret('SUPABASE_SCHEMAS')),
    }
}

/**
 * Load config from local supabase project
 */
export async function loadConfigFromSupabaseConfig(cwd: string = process.cwd()): Promise<Config> {
    return {
        url: await getDbUrlFromCli(cwd),
        schemas: defaultConfig.schemas,
        outputs: [],
    }
}

/**
 * Load config from supabase cli
 *
 * bunx supabase status --json
 */
export async function loadConfigFromSupabaseCli(cwd: string = process.cwd()): Promise<Config> {
    return {
        url: await getDbUrlFromCli(cwd),
        schemas: defaultConfig.schemas,
    }
}

/**
 * Load config from args
 */
export async function loadConfigFromArgs(args: Record<string, string>): Promise<Config> {
    const envConfig = loadConfigFromEnv()
    const supabaseCliConfig = await loadConfigFromSupabaseCli()
    const supabaseConfig = await loadConfigFromSupabaseConfig()

    return defu(envConfig, supabaseCliConfig, supabaseConfig, {
        ...(args['url'] ? { url: args['url'] } : {}),
        ...(args['schemas'] ? { schemas: array.fromString(args['schemas']) } : {}),
        // hooks are not available from args
    })
}
