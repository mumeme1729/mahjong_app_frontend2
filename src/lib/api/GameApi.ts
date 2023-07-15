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





