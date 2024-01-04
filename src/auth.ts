import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { db } from "./db"


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) throw new Error('Missing github oauth credentials')

export const { handlers: { GET, POST }, auth, signIn, signOut, update} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ user, session }) {
            const sessionAdapter = session as unknown as { user: {id: string, name: string, image: string}}
            if(session && user) {
                sessionAdapter.user.id = user.id
            }

            return session
        }
    }
})