import { LoginUserTotalRecord } from "./UserTypes"

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
    rank_id: number | null,
    rank_name: string | null,
    point: number | null
}

export type  ProfilesSchema =  ProfileBasicSchema[] | null

export interface GameGradeProfileBasicSchema extends LoginUserTotalRecord {
    id: string | null,
    nick_name: string | null
}

export type GameGradeProfileSchema = GameGradeProfileBasicSchema[] | null


type RankData = {
    rank: number;
}[];
export interface PersonalRecordPerProfileBasicSchema extends GameGradeProfileBasicSchema {
    id: string | null,
    nick_name: string | null,
    introduction: string | null,
    image: string | null,
    recent_rank: RankData,
    max_score_origin: number | null,
    min_score_origin: number|null,
    rank_name: string | null,
    rate4: number | null,
    point: number | null,
    tobi_rate: number | null
}

export type PersonalRecordPerProfileSchema = PersonalRecordPerProfileBasicSchema | null