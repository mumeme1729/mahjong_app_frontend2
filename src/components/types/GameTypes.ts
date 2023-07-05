export type GamesResultBasicSchema = {
    id: string,
    is_sanma: boolean,
    created_at: string,
    score: number,
    rank: number,
    nick_name: string|null
}

export type GameResultSchema = Record<string, GamesResultBasicSchema[]>
