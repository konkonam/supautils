// @TODO: check gpt code
import { execa } from 'execa'

interface Service {
    [key: string]: unknown
    url?: string
    uri?: string
    port?: number
    connectionString?: string
    connection_string?: string
    connectionUri?: string
    database_url?: string
    dsn?: string
}

interface SupabaseStatus {
    [key: string]: unknown
    db?: { url?: string, connectionString?: string }
    database?: { url?: string, connectionString?: string }
    api?: { db_url?: string }
    services?: Record<string, Service>
}

function extractDbUrlFromStatusJson(json: unknown): string | undefined {
    if (!json || typeof json !== 'object') return undefined
    const j = json as SupabaseStatus

    // Try common locations/keys produced by Supabase CLI or related outputs
    const candidates: Array<string | undefined> = [
        j.db?.url,
        j.db?.connectionString,
        j.database?.url,
        j.database?.connectionString,
        j.api?.db_url,
    ]

    // services.* buckets: db, database, postgres
    const services = j.services || {}
    const serviceKeys = ['db', 'database', 'postgres']
    for (const k of serviceKeys) {
        const svc = services[k]
        if (svc && typeof svc === 'object') {
            candidates.push(
                svc.connectionString,
                svc.connection_string,
                svc.connectionUri,
                svc.url,
                svc.uri,
                svc.database_url,
                svc.dsn,
            )
        }
    }

    // Also scan all services for plausible fields
    for (const key of Object.keys(services)) {
        const svc = services[key]
        if (svc && typeof svc === 'object') {
            candidates.push(
                svc.connectionString,
                svc.connection_string,
                svc.connectionUri,
                svc.url,
                svc.uri,
                svc.database_url,
                svc.dsn,
            )
        }
    }

    // Pick the first non-empty string that looks like a Postgres URL
    const chosen = candidates.find(c => typeof c === 'string' && /postgres:\/\//.test(c))
    return chosen
}

export async function getDbUrlFromCli(cwd: string = process.cwd()): Promise<string | undefined> {
    try {
        const result = await execa('supabase', ['status', '--json'], {
            reject: false,
            shell: true,
            cwd,
        })

        if (result.exitCode === 0 && result.stdout) {
            const json = JSON.parse(result.stdout)
            const dbUrl = extractDbUrlFromStatusJson(json)

            return dbUrl
        }
    }
    catch {
        console.error('Failed to get db url from cli')
    }
}
