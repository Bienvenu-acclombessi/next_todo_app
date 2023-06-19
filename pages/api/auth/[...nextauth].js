
import NextAuth from "next-auth";
import { prisma } from '../../../server/db/client'

import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions={
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          nom: user.nom,
          name: user.prenom,
          randomKey: 'Hey cool'
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token,user }) => {
      console.log('Session Callback', { session, token })
      session.accessToken = token.accessToken
    session.user.id = token.id
    session.user.image = 'token.id'
    console.log('Session Callback2', { session, token })
    // return {
    //   user: {
    //     ...session.user,
    //     id: token.id,
    //     randomKey: token.randomKey
    //   }
    // }
      return session;
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
  }
};
export default NextAuth(authOptions);