import type { Config } from '@/types'

import { zod, types, api } from '@/outputs'

/**
 * Default config
 */
export const defaultConfig: Config = {
    url: 'postgresql://postgres:postgres@localhost:54322/postgres',
    tables: ['public.*'],
    outputDir: './generated/lib',
    outputs: [zod, types, api],
}

/**
 * Load config from environment variables
 */
export function loadConfigFromEnv(): Config {
    const url = process.env['SUPABASE_DB_URL']
    const tables = process.env['SUPABASE_TABLES']?.split(',')

    return {
        ...defaultConfig,
        url,
        tables,
    }
}

/**
 * Load config from execa args
 */
export async function loadConfigFromArgs(args: Record<string, unknown>): Promise<Config> {
    const envConfig = loadConfigFromEnv()

    const url = String(args['url'] ?? envConfig.url)
    const tables = String(args['tables'] ?? envConfig.tables).split(',')
    const outputDir = String(args['outputDir'] ?? envConfig.outputDir)

    const config = {
        ...defaultConfig,
        url,
        tables,
        outputDir,
    }

    // Deduplicates tables
    config.tables = Array.from(new Set(config.tables))

    return config
}
