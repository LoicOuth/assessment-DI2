import { http } from './http.service'
import type { User } from '@/types/api'

const basePath = '/api/users'

const getUsers = async (): Promise<User[]> => {
  const response = await http.get<{ data: User[] }>(basePath, {
    params: { page: 1 },
  })
  return response.data
}

const createUser = async (userData: {
  firstName: string
  lastName: string
  email: string
  age: number
  isActive?: boolean
}): Promise<User> => {
  return http.post<User>(basePath, userData)
}

export { createUser, getUsers }
