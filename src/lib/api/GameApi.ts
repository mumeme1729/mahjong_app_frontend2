import apiClient from '../ApiClient'

import {GameCreateSchema, GameResultSchema} from '../../components/types/GameTypes'
import { CommonResponse } from '../../components/types/CommonTypes'


// Game作成
export async function postCreateGame(body:GameCreateSchema) {
  try {
    
    const response = await apiClient.post<CommonResponse>(`/api/games/create_game`,body)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

// Game削除
// グループ情報更新
export async function deleteGame(game_id:string|undefined) {
  try {
    
    const params ={
      game_id:game_id,
    }

    const response = await apiClient.delete<CommonResponse>(`/api/games/delete_game`, {params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}



