import type { TransformColumnPayload } from '@/types'

export function withConstraints(transformer: (payload: TransformColumnPayload) => string, payload: TransformColumnPayload) {
    let result = transformer(payload)

    if (payload.column.default) {
        result += payload.transformers['transform:default'](payload)
    }

    if (payload.column.readonly) {
        result += payload.transformers['transform:readonly'](payload)
    }

    if (payload.column.min) {
        result += payload.transformers['transform:min'](payload)
    }

    if (payload.column.max) {
        result += payload.transformers['transform:max'](payload)
    }

    if (payload.column.nullable) {
        result += payload.transformers['transform:nullable'](payload)
    }

    return result
}

export function transformColumn(payload: TransformColumnPayload) {
    switch (payload.column.type) {
        case 'uuid':
        case 'character varying':
        case 'text': {
            return withConstraints(
                payload.transformers['transform:string'],
                payload,
            )
        }
        case 'integer':
        case 'numeric':
        case 'smallint': {
            return withConstraints(
                payload.transformers['transform:number'],
                payload,
            )
        }
        case 'timestamp without time zone':
        case 'timestamp with time zone': {
            return withConstraints(
                payload.transformers['transform:date'],
                payload,
            )
        }
        case 'boolean': {
            return withConstraints(
                payload.transformers['transform:boolean'],
                payload,
            )
        }
        case 'jsonb': {
            return withConstraints(
                payload.transformers['transform:json'],
                payload,
            )
        }
        default: {
            return withConstraints(
                payload.transformers['transform:unknown'],
                payload,
            )
        }
    }
}
