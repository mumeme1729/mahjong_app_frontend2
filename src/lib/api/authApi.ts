

import apiClient from '../apiClient'
import { UserRegist } from '../../components/types/auth/auth_types'

export type RegistResponse = {
  status: string
  details: string | null
}

export async function userRegister(user_info:UserRegist) {
    try {
      const response = await apiClient.post<RegistResponse>(`/api/register`,user_info)
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }