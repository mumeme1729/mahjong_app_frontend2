

import apiClient from '../ApiClient'
import { UserRegist } from '../../components/types/AuthTypes'
import { CommonResponse } from '../../components/types/CommonTypes'


export async function postUserRegister(user_info:UserRegist) {
    try {
      const response = await apiClient.post<CommonResponse>(`/api/register`,user_info)
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }