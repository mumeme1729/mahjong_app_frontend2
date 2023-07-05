import apiClient from '../ApiClient'
import { GroupHomeSchema } from '../../components/types/GroupTypes'
import {GameResultSchema} from '../../components/types/GameTypes'

// 選択したグループの情報を取得
export async function getSelectedGroupInfo(group_id:string) {
    try {
      const response = await apiClient.get<GroupHomeSchema>(
        `/api/groups/get_selected_group`,
        {
            params:{
                group_id:group_id
            }
        }
      )
      return response.data
    } catch (error: unknown) {
      throw error
    }
}

// 選択したグループの直近のゲーム結果を取得
export async function getRecentlyGames(group_id:string) {
    try {
      const response = await apiClient.get<GameResultSchema>(
        `/api/groups/get_selected_group_recently_games`,
        {
            params:{
                group_id:group_id
            }
        }
      )
      return response.data
    } catch (error: unknown) {
      throw error
    }
}

