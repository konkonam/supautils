
    export const addresses = z.object({
        id: uuid,
        name: text,
        country: text,
        state: text,
        zip: text,
        city: text,
        street: text,
        house_number: text,
        geo: USER-DEFINED,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const comments = z.object({
        id: uuid,
        user_id: uuid,
        text: text,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const companies = z.object({
        id: uuid,
        owner_id: uuid,
        contact_id: uuid,
        address_id: uuid,
        name: text,
        slug: text,
        vat_number: text,
        intro: text,
        description: text,
        homepage: text,
        employees_amount: integer,
        legal_form_id: uuid,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const company_preferences = z.object({
        id: uuid,
        budget_min: integer,
        budget_missing_ok: boolean,
        max_distance: integer,
        team_size: USER-DEFINED,
        max_duration: integer,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const company_skills = z.object({
        company_id: uuid,
        skill_id: uuid,
        is_verified: boolean,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const company_staff = z.object({
        company_id: uuid,
        user_id: uuid,
        role: USER-DEFINED,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const legal_forms = z.object({
        id: uuid,
        code: text,
        country: text,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const project_matches = z.object({
        project_id: uuid,
        company_id: uuid,
        match_score: numeric,
        visible_to_project: boolean,
        visible_to_company: boolean,
        project_viewed_at: timestamp without time zone,
        company_viewed_at: timestamp without time zone,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const offer_comments = z.object({
        offer_id: uuid,
        comment_id: uuid,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const offers = z.object({
        id: uuid,
        project_id: uuid,
        company_id: uuid,
        status: USER-DEFINED,
        description: text,
        concept: jsonb,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const profiles = z.object({
        id: uuid,
        pronouns: USER-DEFINED,
        first_name: text,
        last_name: text,
        email: text,
        phone: text,
        avatar: text,
        bio: text,
        timezone: text,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const project_preferences = z.object({
        id: uuid,
        budget_max: integer,
        max_distance: integer,
        team_size_min: USER-DEFINED,
        team_size_max: USER-DEFINED,
        start_date: date,
        end_date: date,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const project_skills = z.object({
        project_id: uuid,
        skill_id: uuid,
        verified_only: boolean,
        is_mandatory: boolean,
        reasons: text,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const project_tags = z.object({
        project_id: uuid,
        tag_id: uuid,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const projects = z.object({
        id: uuid,
        company_id: uuid,
        name: text,
        introduction: text,
        description: text,
        status: USER-DEFINED,
        team_size: USER-DEFINED,
        starts_at: timestamp without time zone,
        expires_at: timestamp without time zone,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const skills = z.object({
        id: uuid,
        code: text,
        icon: text,
        usage_count: integer,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
export const tags = z.object({
        id: uuid,
        code: text,
        icon: text,
        usage_count: integer,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
    })
    