import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for token in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
    if (token) {
      // Fetch user data
      fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
      })
      .catch(() => {
        // If token is invalid, clear it
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data: AuthResponse = await response.json()
      
      // Store token in cookie
      document.cookie = `token=${data.token}` 
      
      // Set user data
      setUser(data.user)
      
      return data
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Remove token from cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    
    // Clear user data
    setUser(null)
    
    // Show success message
    toast.success("Logged out successfully")
    
    // Redirect to home page
    router.push('/')
    
    // Force a page reload to clear any cached auth state
    window.location.reload()
  }

  return {
    login,
    logout,
    isLoading,
    user
  }
} 