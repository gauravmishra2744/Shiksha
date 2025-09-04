import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      subject?: string
    }
  }

  interface User {
    role: string
    subject?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    subject?: string
  }
}