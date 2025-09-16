export function splitBy(str: string, separator: string): string[] {
    return str.split(separator).map(s => s.trim()).filter(Boolean)
}

export function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, g => g[1].toUpperCase())
}
