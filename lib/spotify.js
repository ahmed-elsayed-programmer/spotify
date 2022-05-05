import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collabrative',
  'user-read-email',
  'streaming',
  'user-read-private',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',')

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params)

const LOGIN_URL = `https://accounts.spotify.com/en/login?${queryParamString.toString()}`

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.next_public_ID,
  clientSecret: process.env.Next_public_secret,
})

export default spotifyAPI

export { LOGIN_URL }
