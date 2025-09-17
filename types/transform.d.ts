import type { MappedColumn, MappedTable } from '@/types'

export type TransformColumnPayload = {
    column: MappedColumn
    transformers: Transformers
}

export type TransformTablePayload = {
    table: MappedTable
    columns: string
}

export type Transformers = {
    // types
    'transform:string': (payload: TransformColumnPayload) => string
    'transform:number': (payload: TransformColumnPayload) => string
    'transform:boolean': (payload: TransformColumnPayload) => string
    'transform:date': (payload: TransformColumnPayload) => string
    'transform:json': (payload: TransformColumnPayload) => string
    'transform:unknown': (payload: TransformColumnPayload) => string

    // constraints
    'transform:default': (payload: TransformColumnPayload) => string | null
    'transform:min': (payload: TransformColumnPayload) => string | null
    'transform:max': (payload: TransformColumnPayload) => string | null
    'transform:nullable': (payload: TransformColumnPayload) => string | null
    'transform:readonly': (payload: TransformColumnPayload) => string | null

    // table
    'transform:table': (payload: TransformTablePayload) => string
}
