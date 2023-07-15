export type GamesResultBasicSchema = {
    id: string,
    is_sanma: boolean,
    created_at: string,
    score: number,
    rank: number,
    nick_name: string|null
}

export type GameResultSchema = Record<string, GamesResultBasicSchema[]>


export type GameResultCreateSchema = {
    rank: number,
    score: number,
    score_origin: number,
    profile: string
}

export type GameCreateSchema = {
    is_sanma:boolean, 
    group_id:string, 
    game_results:GameResultCreateSchema[]
}