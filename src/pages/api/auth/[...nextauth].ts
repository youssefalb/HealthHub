import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import prisma from "../../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },

  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        type: 'credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {},
    async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          console.log("====CREDENTIALS===")
          console.log(credentials)
          const {email, password} = credentials as {
            email: String,
            password: String
          }
          console.log(email)

        const res = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
        const user = await res.json()

        console.log(user)
          // If no error and we have user data, return it
        if (res.ok && user) {
            return user
          }
          // Return null if user data could not be retrieved
        return null
    }
   }),
   EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    })

  ],
  pages: {
    signIn: "/login",
    //error: "/api/error"
    //signOut: "/api/signout"
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
