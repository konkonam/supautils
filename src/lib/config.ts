import type { MappedColumn, MappedTable } from '@/lib/map'
import type { AppHooks } from '@/lib/hooks'

import * as array from '@/utils/array'
import { getDbUrlFromCli } from '@/lib/supabase'
import defu from 'defu'

export type TransformColumnPayload = {
    column: MappedColumn
    transformers: Transformers
}

export type TransformTablePayload = {
    table: MappedTable
    columns: string
}

export type Transformers = {
    // types
    'transform:string': (payload: TransformColumnPayload) => string
    'transform:number': (payload: TransformColumnPayload) => string
    'transform:boolean': (payload: TransformColumnPayload) => string
    'transform:date': (payload: TransformColumnPayload) => string
    'transform:unknown': (payload: TransformColumnPayload) => string

    // constraints
    'transform:default': (payload: TransformColumnPayload) => string
    'transform:min': (payload: TransformColumnPayload) => string
    'transform:max': (payload: TransformColumnPayload) => string

    // table
    'transform:table': (payload: TransformTablePayload) => string
}

export type ConfiguredOutput = {
    path: string
    clear?: boolean
    transformers: Transformers
}

export type Config = {
    url: string
    tables: string[]
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
    tables: ['public.*'],
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
        tables: array.fromString(readSecret('SUPABASE_SCHEMAS')),
    }
}

/**
 * Load config from local supabase project
 */
export async function loadConfigFromSupabaseConfig(cwd: string = process.cwd()): Promise<Config> {
    return {
        url: await getDbUrlFromCli(cwd),
        tables: defaultConfig.tables,
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
