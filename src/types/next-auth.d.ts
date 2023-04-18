import NextAuth, { DefaultSession } from "next-auth"
import { JWT, DefaultUser } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      name?: string
      email?: string
      role?: string
    }
  }

  interface User {
    fname: string
    lname?: string
    sex?: string
    emailVerified?: Date
    role?: string
  }

  interface Profile {
    family_name?: string
    given_name?: string
    picture?: string
    email_verified?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    accessToken?: string
    role?: string
  }
}
