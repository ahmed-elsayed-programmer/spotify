import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from './useSpotify'

const useSongInfo = () => {
  const SpotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fectchSongInfo = async () => {
      if (currentTrackId) {
        const TrackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${SpotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(TrackInfo)
      }
    }

    fectchSongInfo()
  }, [currentTrackId, SpotifyApi])

  return songInfo
}

export default useSongInfo
