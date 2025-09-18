import type { Config } from '@/types'

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
 * Read a secret from env or return undefined
 */
export function readSecret(key: string) {
    const value = process.env[key]
    if (!value) {
        return undefined
    }

    return value
}

/**
 * Load config from environment variables
 */
export function loadConfigFromEnv(): Config {
    const url = readSecret('SUPABASE_DB_URL')
    const tables = readSecret('SUPABASE_TABLES')?.split(',')

    return defu({
        ...(url ? { url } : {}),
        ...(tables ? { tables } : {}),
    }, defaultConfig)
}

/**
 * Load config from local supabase project
 */
export async function loadConfigFromSupabaseConfig(cwd: string = process.cwd()): Promise<Config> {
    const url = await getDbUrlFromCli(cwd)

    return defu({
        ...(url ? { url } : {}),
    }, defaultConfig)
}

/**
 * Load config from supabase cli
 *
 * bunx supabase status --json
 */
export async function loadConfigFromSupabaseCli(cwd: string = process.cwd()): Promise<Config> {
    const url = await getDbUrlFromCli(cwd)

    return defu({
        ...(url ? { url } : {}),
    }, defaultConfig)
}

/**
 * Load config from args
 */
export async function loadConfigFromArgs(args: Record<string, string | number | boolean | string[] | number[] | boolean[]>): Promise<Config> {
    const envConfig = loadConfigFromEnv()
    const supabaseCliConfig = await loadConfigFromSupabaseCli()
    const supabaseConfig = await loadConfigFromSupabaseConfig()

    return defu({
        ...(args['url'] ? { url: args['url'] as string } : {}),
        ...(args['tables'] ? { tables: args['tables'] as string[] } : {}),
    }, envConfig, supabaseCliConfig, supabaseConfig)
}
