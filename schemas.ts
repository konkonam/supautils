import z from 'zod'

export const addresses = z.object({
    id: z.unknown(),
    name: z.string(),
    country: z.string(),
    state: z.string(),
    zip: z.string(),
    city: z.string(),
    street: z.string(),
    house_number: z.string(),
    geo: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const comments = z.object({
    id: z.unknown(),
    user_id: z.unknown(),
    text: z.string(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const companies = z.object({
    id: z.unknown(),
    owner_id: z.unknown(),
    contact_id: z.unknown(),
    address_id: z.unknown(),
    name: z.string(),
    slug: z.string(),
    vat_number: z.string(),
    intro: z.string(),
    description: z.string(),
    homepage: z.string(),
    employees_amount: z.number(),
    legal_form_id: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const company_preferences = z.object({
    id: z.unknown(),
    budget_min: z.number(),
    budget_missing_ok: z.unknown(),
    max_distance: z.number(),
    team_size: z.unknown(),
    max_duration: z.number(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const company_skills = z.object({
    company_id: z.unknown(),
    skill_id: z.unknown(),
    is_verified: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const company_staff = z.object({
    company_id: z.unknown(),
    user_id: z.unknown(),
    role: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const legal_forms = z.object({
    id: z.unknown(),
    code: z.string(),
    country: z.string(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const project_matches = z.object({
    project_id: z.unknown(),
    company_id: z.unknown(),
    match_score: z.unknown(),
    visible_to_project: z.unknown(),
    visible_to_company: z.unknown(),
    project_viewed_at: z.unknown(),
    company_viewed_at: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const offer_comments = z.object({
    offer_id: z.unknown(),
    comment_id: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const offers = z.object({
    id: z.unknown(),
    project_id: z.unknown(),
    company_id: z.unknown(),
    status: z.unknown(),
    description: z.string(),
    concept: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const profiles = z.object({
    id: z.unknown(),
    pronouns: z.unknown(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    avatar: z.string(),
    bio: z.string(),
    timezone: z.string(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const project_preferences = z.object({
    id: z.unknown(),
    budget_max: z.number(),
    max_distance: z.number(),
    team_size_min: z.unknown(),
    team_size_max: z.unknown(),
    start_date: z.unknown(),
    end_date: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const project_skills = z.object({
    project_id: z.unknown(),
    skill_id: z.unknown(),
    verified_only: z.unknown(),
    is_mandatory: z.unknown(),
    reasons: z.string(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const project_tags = z.object({
    project_id: z.unknown(),
    tag_id: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const projects = z.object({
    id: z.unknown(),
    company_id: z.unknown(),
    name: z.string(),
    introduction: z.string(),
    description: z.string(),
    status: z.unknown(),
    team_size: z.unknown(),
    starts_at: z.unknown(),
    expires_at: z.unknown(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const skills = z.object({
    id: z.unknown(),
    code: z.string(),
    icon: z.string(),
    usage_count: z.number(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
export const tags = z.object({
    id: z.unknown(),
    code: z.string(),
    icon: z.string(),
    usage_count: z.number(),
    created_at: z.unknown(),
    updated_at: z.unknown(),
})
