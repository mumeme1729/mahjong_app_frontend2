import { GroupBasicSchema } from "./group_types"

export type UserBasicSchema = {
    id: string,
    title: string,
    password: string,
    text: string,
    image: string,
    created_at: string,
    update_at: string
}


export type LoginUserInfo = {
    nick_name: string|null,
    image: string|null,
    introduction: string|null,
    group:GroupBasicSchema[]|null
}