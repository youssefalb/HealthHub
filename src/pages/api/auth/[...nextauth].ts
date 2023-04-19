import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import prisma from "@lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
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
                //console.log("====CREDENTIALS===")
                //console.log(credentials)
                const { email, password } = credentials as {
                    email: String,
                    password: String
                }

                const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                const temp = user.user

                // If no error and we have user data, return it

                if (res.ok && temp && temp.emailVerified) {
                    return temp
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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })

    ],
    pages: {
        //TODO: Custom pages for errors/signOut
        signIn: "/auth/login",
        //error: "/api/error"
        //signOut: "/api/signout"
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                user.fname = profile.given_name
                user.lname = profile.family_name
                user.image = profile.picture
                if (profile.email_verified == true)
                    user.emailVerified = new Date()
                

                delete user.name
                console.log("===SIGNIN===")
                console.log(profile)  
                console.log(account)                
                
                console.log(user)
            }
            return true
        },
        session: async ({ session, token }) => {
            session.user.id = token.id
            session.user.name = token.name
            session.user.role = token.role
            // session.accessToken = token.accessToken
                // console.log("===SESSION===")           
                // console.log(token) 
                // console.log(session)
            return session
        },
        jwt: async ({ profile, account, user, token }) => {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
                token.name = user.fname + " " + user.lname
                token.role = user.role
            }
              //  console.log("===JWT===")
                // console.log(profile)  
                // console.log(account)                
                // console.log(token) 
                // console.log(user)
            return token
        },
    },
};


