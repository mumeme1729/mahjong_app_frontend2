
export type ProfileBasicSchema = {
    id: string | null,
    created_at: string | null,
    nick_name:string | null,
    introduction:string | null,
    user: string | null,
    is_active: boolean | null,
    update_at: string | null,
    image: string | null,
    group: string | null,
    rate4: number | null,
    rate3: number | null,
}

export type  ProfilesSchema =  ProfileBasicSchema[] | null
