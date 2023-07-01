

import apiClient from '../apiClient'
import { LoginUserInfo } from '../../components/types/auth/user_types'

export async function getLoginUserinfo() {
    try {
      const response = await apiClient.get<LoginUserInfo>(`/api/users/me`)
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }