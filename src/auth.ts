import NextAuth from "next-auth"
import Credential from "next-auth/providers/credentials"

import { IErrorResponse } from "@/types/mypage/mypage"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credential({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials

        const response = await fetch(
          `${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        )

        if (!response.ok) {
          const errorResponse: IErrorResponse = await response.json()
          throw new Error(errorResponse.message)
        }

        const data = await response.json()

        return {
          ...data,
          accessToken: data.token,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    signIn: async () => {
      return true
    },
    jwt: async ({ token, user }) => {
      const newToken = { ...token }
      if (user?.accessToken) {
        newToken.accessToken = user.accessToken
      }
      return newToken
    },
    session: async ({ session, token }) => {
      const newSession = { ...session }
      if (token?.accessToken) {
        newSession.accessToken = token.accessToken
      }
      return newSession
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
  pages: {
    error: "/auth/error",
  },
})
