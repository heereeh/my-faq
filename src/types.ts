export interface Conversation {
  text: string
  id: string
  userId: string
  createdAt: NT
}

export interface NT {
  nanoseconds: number
  seconds: number
}

export interface User {
  displayName: string | null
  uid: string
}

export interface AppRouterOption {
  refreshUser: () => void
  isLoggedIn: boolean
  user: User
}