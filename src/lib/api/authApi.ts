

import apiClient from '../apiClient'
import { RegistResponse, UserRegist } from '../../components/types/auth/auth_types'


export async function postUserRegister(user_info:UserRegist) {
    try {
      const response = await apiClient.post<RegistResponse>(`/api/register`,user_info)
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }