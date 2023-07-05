import { GameResultSchema } from "./GameTypes"
import { ProfileBasicSchema } from "./ProfileTypes"

export type GroupBasicSchema = {
    id: string,
    title: string,
    password: string|null,
    text: string|null,
    image: string|null,
    created_at: string,
    update_at: string
}

export interface GroupHomeSchema extends GroupBasicSchema {
    profiles: ProfileBasicSchema[] | null,
}
