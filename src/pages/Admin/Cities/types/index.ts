import type { PaginationQuery } from '@/types/common'

export interface CityWithoutHotelsDto {
  id: number
  name: string
  description?: string | null
}

export interface CityForCreationDto {
  name: string
  description?: string | null
}

export interface CityDto extends CityWithoutHotelsDto {
  description?: string | null
}

export type { PaginationQuery }
