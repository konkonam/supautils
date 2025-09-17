export function splitBy(str: string, separator: string): string[] {
    return str.split(separator).map(s => s.trim()).filter(Boolean)
}

export function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, g => g[1].toUpperCase())
}

export function toPascalCase(str: string): string {
    return toCamelCase(str).replace(/^[a-z]/, g => g.toUpperCase())
}

export function capitalize(str: string): string {
    return str.replace(/^[a-z]/, g => g.toUpperCase())
}

export function decapitalize(str: string): string {
    return str.replace(/^[A-Z]/, g => g.toLowerCase())
}

export function processTables(tables: string[]): Record<string, string[] | null> {
    const includes: Record<string, Set<string> | null> = {}

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
                includes[parts[0]] = null
                continue
            }

            includes[parts[0]].add(parts[1])
        }
    }

    return Object.entries(includes).reduce((acc, [schema, tables]) => {
        if (tables === null) {
            acc[schema] = null

            return acc
        }

        if (!acc[schema]) {
            acc[schema] = []
        }

        acc[schema].push(...Array.from(tables))

        return acc
    }, {} as Record<string, string[] | null>)
}
