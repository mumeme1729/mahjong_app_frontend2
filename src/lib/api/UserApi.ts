

import apiClient from '../ApiClient'
import { LoginUserInfo, LoginUserTotalRecord } from '../../components/types/UserTypes'
import { CommonResponse } from '../../components/types/CommonTypes'

// ログインしているユーザーの情報を取得
export async function getLoginUserinfo() {
    try {
      const response = await apiClient.get<LoginUserInfo>(`/api/users/me`)
      return response.data
    } catch (error: unknown) {
      throw error
    }
}

// ログインしているユーザーのトータル戦歴を取得
export async function getLoginUserTotalRecord(is_sanma:boolean) {
    try {
      
      const response = await apiClient.get<LoginUserTotalRecord>(
        `/api/game_results/login_user_total_gameresults4`,
        {
            params:{
                is_sanma:is_sanma
            }
        }
      )
      return response.data
    } catch (error: unknown) {
      throw error
    }
}

// ログインしているユーザー情報を更新する
export async function putUpdateUserInfo(nickName:string, introduction:string, upload_file:File|null) {
    try {
      
      const params ={
        nick_name:nickName,
        introduction: introduction
      }

      const formData = new FormData();
      if(upload_file !== null){
        formData.append('upload_file',upload_file)
      }

      const response = await apiClient.put<CommonResponse>(`/api/users/update_user_info`,upload_file?formData:null, {params})
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }