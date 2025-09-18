export function pickUnique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr))
}

export function pickFirst<T = string>(...vals: Array<T | undefined | null>): T | undefined {
    for (const v of vals) {
        if (v != null) return v as T
    }
}

export function fromString(str: string): string[] | undefined {
    const arr = str.split(',').map(s => s.trim()).filter(Boolean)
    if (arr.length === 0) return

    return arr
}
