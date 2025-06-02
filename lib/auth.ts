import { cookies } from 'next/headers'

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export async function isAuthenticated() {
  return !!(await getAuthToken())
}

export async function requireAuth() {
  const token = await getAuthToken()
  if (!token) {
    throw new Error('Authentication required')
  }
  return token
} 