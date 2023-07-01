
export type RegistResponse = {
  status: string
  details: string | null
}

export type UserRegist = {
    firebase_uid: string,
    is_active: boolean
  }