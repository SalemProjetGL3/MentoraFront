export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface UseAuthReturn {
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => void
  isLoading: boolean
}

export function useAuth(): UseAuthReturn 