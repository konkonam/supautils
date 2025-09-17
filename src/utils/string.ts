export function splitBy(str: string, separator: string): string[] {
    return str.split(separator).map(s => s.trim()).filter(Boolean)
}

export function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, g => g[1].toUpperCase())
}

export function processTables(tables: string[]): Record<string, string[] | undefined> {
    const includes: Record<string, Set<string> | undefined> = {}

    for (const table of tables) {
        if (table.match(/\./)) {
            const parts = table.split('.')

            if (parts.length > 2 || parts.length < 1) {
                throw new Error(`Invalid table name: "${table}"`)
            }

            if (!includes[parts[0]]) {
                includes[parts[0]] = new Set()
            }

            if (parts[1] === '*') {
                includes[parts[0]] = undefined
                continue
            }

            includes[parts[0]].add(parts[1])
        }
    }

    return Object.entries(includes).reduce((acc, [schema, tables]) => {
        acc[schema] = tables ? Array.from(tables) : undefined
        return acc
    }, {} as Record<string, string[] | undefined>)
}
