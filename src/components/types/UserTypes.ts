import { GroupBasicSchema } from "./GroupTypes"

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
    nick_name: string|null|undefined,
    image: string|null|undefined,
    introduction: string|null|undefined,
    group:GroupBasicSchema[]|null|undefined
}

export type LoginUserTotalRecord = {
    game_count: number,
    rank1: number,
    rank2: number,
    rank3: number,
    rank4: number,
    total_score: number,
    score_average: number,
    rank_average: number,
    top_rate: number,
    last_rate: number,
    winning_rate:  number
}