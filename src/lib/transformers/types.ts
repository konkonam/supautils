function makeMin({ table, field }: FieldParams) {
    if (!field) return ''

    return `.min(${field.default_value})`
}

function makeMax({ table, field }: FieldParams) {
    if (!field.default_value) return ''

    return `.max(${field.default_value})`
}

function makeDefault({ table, field }: FieldParams) {
    if (!field.default_value) return ''

    return `.default(${field.default_value})`
}

function makeString({ table, field }: FieldParams) {
    return `z.string()${makeDefault({ table, field })}`
}

function makeNumber({ table, field }: FieldParams) {
    return `z.number()${makeDefault({ table, field })}`
}

function makeBoolean({ table, field }: FieldParams) {
    return `z.boolean()${makeDefault({ table, field })}`
}

function makeDate({ table, field }: FieldParams) {
    return `z.date()${makeDefault({ table, field })}`
}
