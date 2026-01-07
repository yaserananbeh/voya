import type { UserType } from '@/types/common'

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}
