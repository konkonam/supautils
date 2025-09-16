import type { Transformers } from '@/lib/config'

export function pickColumnTransformer(type: string, transformers: Transformers) {
    switch (type) {
        case 'text': {
            return transformers['transform:string']
        }
        case 'integer': {
            return transformers['transform:number']
        }
        default: {
            return transformers['transform:unknown']
        }
    }
}
