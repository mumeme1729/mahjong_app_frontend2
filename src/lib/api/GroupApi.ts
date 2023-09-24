import apiClient from '../ApiClient'
import { GroupHomeSchema } from '../../components/types/GroupTypes'
import {GameResultSchema} from '../../components/types/GameTypes'
import { CommonResponse } from '../../components/types/CommonTypes'
import { GameGradeProfileSchema, PersonalRecordPerProfileSchema, ProfilesSchema } from '../../components/types/ProfileTypes'

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


// 全プロフィールの指定期間内のデータを取得
export async function getAllProfilesGameGrade(is_sanma:boolean, profile_ids:(string|null)[], date_from:string|null, date_until:string) {
  try {
    
    const params ={
      is_sanma:is_sanma,
      date_from: date_from!== null? date_from : '2023/04/07 11:11:11',
      date_until:date_until
    }

    const response = await apiClient.post<GameGradeProfileSchema>(`/api/game_results/profile_total_game_grade4`,profile_ids,{params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

// プロフィールごとの戦績を取得
export async function getPersonalRecordPerProfile(is_sanma:boolean, profile_id:string) {
  try {
    
    const params ={
      is_sanma:is_sanma,
      profile_id:profile_id
    }

    const response = await apiClient.get<PersonalRecordPerProfileSchema>(`/api/game_results/personal_record_per_profile`, {params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

// 指定期間内の対局記録を取得
export async function getGamesSpecifiedPeriod(group_id:string, date_from:string|null, date_until:string) {
  try {
    
    const params ={
      group_id:group_id,
      date_from: date_from!== null? date_from : '2023/04/07 11:11:11',
      date_until:date_until
    }
    const response = await apiClient.get<GameResultSchema>(`/api/groups/get_games_specified_period`,{params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}


// グループ情報更新
export async function putUpdateGroupInfo(group_id:string|undefined, title:string, text:string, password:string, upload_file:File|null) {
  try {
    
    const params ={
      group_id:group_id,
      title:title,
      text: text,
      password:password
    }

    const formData = new FormData();
    if(upload_file !== null){
      formData.append('upload_file',upload_file)
    }

    const response = await apiClient.put<GroupHomeSchema>(`/api/groups/update_group`,upload_file?formData:null, {params})
    return response.data
  } catch (error: unknown) {
    throw error
  }
}