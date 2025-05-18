import { cookies } from 'next/headers'

export function getAuthToken() {
  const cookieStore = cookies()
  return cookieStore.get('token')?.value
}

export function isAuthenticated() {
  return !!getAuthToken()
}

export function requireAuth() {
  const token = getAuthToken()
  if (!token) {
    throw new Error('Authentication required')
  }
  return token
} 