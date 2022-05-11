import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.next_public_ID,
  clientSecret: process.env.Next_public_secret,
  redirectUri: 'http://localhost:3000/api/auth/callback/spotify',
})

const useSpotify = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      if (session.error === 'refresh Access Token Error ') signOut()

      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
