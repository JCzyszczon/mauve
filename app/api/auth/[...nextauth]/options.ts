import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials, req) {        
                const user = { id: "1337", name: credentials.username, password: credentials.password };
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
              },
        })
    ],
    session: {
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
    pages: {
        signIn: '/admin',
    }
}