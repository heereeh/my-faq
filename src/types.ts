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