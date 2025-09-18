import type { TransformColumnPayload } from '@/types'

/**
 * Adds constraints to a column
 */
export function addConstraints(value: string, payload: TransformColumnPayload): string {
    if (payload.column.readonly) {
        value += payload.transformers['transform:readonly'](payload)
    }

    if (payload.column.min) {
        value += payload.transformers['transform:min'](payload)
    }

    if (payload.column.max) {
        value += payload.transformers['transform:max'](payload)
    }

    if (payload.column.nullable) {
        value += payload.transformers['transform:nullable'](payload)
    }

    return value
}

/**
 * Transforms a column to a Zod type
 */
export function transformColumn(payload: TransformColumnPayload): string {
    switch (payload.column.type) {
        case 'uuid':
        case 'character varying':
        case 'text': {
            const result = payload.transformers['transform:string'](payload)
            return addConstraints(result, payload)
        }
        case 'integer':
        case 'numeric':
        case 'smallint': {
            const result = payload.transformers['transform:number'](payload)
            return addConstraints(result, payload)
        }
        case 'timestamp without time zone':
        case 'timestamp with time zone': {
            const result = payload.transformers['transform:date'](payload)
            return addConstraints(result, payload)
        }
        case 'boolean': {
            const result = payload.transformers['transform:boolean'](payload)
            return addConstraints(result, payload)
        }
        case 'jsonb': {
            const result = payload.transformers['transform:json'](payload)
            return addConstraints(result, payload)
        }
        default: {
            const result = payload.transformers['transform:unknown'](payload)
            return addConstraints(result, payload)
        }
    }
}
