import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.next_public_ID,
      clientSecret: process.env.Next_public_secret,
      // authorization: LoginURL,
    }),
    // ...add more providers here
  ],
})
