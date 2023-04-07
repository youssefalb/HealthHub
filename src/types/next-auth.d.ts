import NextAuth, { DefaultSession } from "next-auth"
import { JWT, DefaultUser } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string
            name?: string
            email?: string
        }
    }

    interface User {
        fname: string
        lname?: string
        sex?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        accessToken?: string
    }
}
