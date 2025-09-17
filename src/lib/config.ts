import type { Config } from '@/types'

import * as array from '@/utils/array'
import { getDbUrlFromCli } from '@/lib/db'
import { join } from 'node:path'
import defu from 'defu'

import zod from '@/outputs/zod'
import types from '@/outputs/types'
import api from '@/outputs/api'

/**
 * Default config
 */
export const defaultConfig: Config = {
    url: 'postgres://postgres:postgres@localhost:5432/postgres',
    tables: ['public.*'],
    outputDir: join(process.cwd(), './generated/lib'),
    outputs: [zod, types, api],
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
        tables: array.fromString(readSecret('SUPABASE_TABLES')),
        outputs: defaultConfig.outputs,
    }
}

/**
 * Load config from local supabase project
 */
export async function loadConfigFromSupabaseConfig(cwd: string = process.cwd()): Promise<Config> {
    return {
        url: await getDbUrlFromCli(cwd),
        tables: defaultConfig.tables,
        outputs: defaultConfig.outputs,
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
        tables: defaultConfig.tables,
        outputs: defaultConfig.outputs,
    }
}

/**
 * Load config from args
 */
export async function loadConfigFromArgs(args: Record<string, string | number | boolean | string[] | number[] | boolean[]>): Promise<Config> {
    const envConfig = loadConfigFromEnv()
    const supabaseCliConfig = await loadConfigFromSupabaseCli()
    const supabaseConfig = await loadConfigFromSupabaseConfig()

    return defu(envConfig, supabaseCliConfig, supabaseConfig, {
        ...(args['url'] ? { url: args['url'] } : {}),
        ...(args['tables'] ? { tables: array.fromString(args['tables'] as string) } : {}),
        // hooks are not available from args
    })
}
