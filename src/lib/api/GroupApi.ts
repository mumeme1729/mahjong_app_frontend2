import apiClient from '../ApiClient'
import { GroupHomeSchema } from '../../components/types/GroupTypes'
import {GameResultSchema} from '../../components/types/GameTypes'
import { CommonResponse } from '../../components/types/CommonTypes'
import { ProfilesSchema } from '../../components/types/ProfileTypes'

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


// グループ作成
export async function postCreateGroup(title:string, password:string, text:string, upload_file:File|null) {
  try {
    
    const params ={
      title:title,
      password: password,
      text:text
    }

    const formData = new FormData();
    if(upload_file !== null){
      formData.append('upload_file',upload_file)
    }

    const response = await apiClient.post<CommonResponse>(`/api/groups/create_groups`,upload_file?formData:null, {params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

// グループに参加
export async function putJoinGroup(group_id:string, password:string) {
  try {
    
    const params ={
      group_id:group_id,
      password: password
    }

    const response = await apiClient.put<CommonResponse>(`/api/groups/join_group`,null, {params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

// プロフィール情報取得
export async function getProfiles(group_id:string) {
  try {
    
    const params ={
      group_id:group_id
    }

    const response = await apiClient.get<ProfilesSchema>(`/api/groups/profiles`,{params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}



