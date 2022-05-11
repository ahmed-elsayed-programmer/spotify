import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'

const Player = () => {
  const SpotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchSongInfo = async () => {
    if (!songInfo) {
      SpotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        setCurrentTrackId(data.body.item.id)
        SpotifyApi.getMyCurrentPlayBackState().then((data: any) => {
          console.log('now playing :', data.body)
          setIsPlaying(data.body.is_playing)
        })
      })
    }
  }

  const handlePlayPuse = () => {
    // SpotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
    //   if (data.body.is_playing) {
    //     // SpotifyApi.pause()
    //     setIsPlaying(false)
    //   } else {
    //     // SpotifyApi.play()
    //     setIsPlaying(true)
    //   }
    // })

    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (SpotifyApi.getAccessToken() && !currentTrackId) {
      fetchSongInfo()
      setVolume(50)
    }
  }, [currentTrackId, SpotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      // debounce AdjustVolume
      debounceAdjustVolume()
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(() => {
    debounce((volume) => {
      SpotifyApi.setVolume(volume).catch((err: any) => console.log(err))
    }, 500)
  }, [volume])

  return (
    <div
      className=" grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-800
    px-2 text-xs text-white md:px-8 md:text-base
    "
    >
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images[0].url}
          className="hidden h-10 w-10 md:inline"
          alt=""
        />
        <div>
          <h3>{songInfo?.name} </h3>
          <p>{songInfo?.artists?.[0].name} </p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPuse} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPuse} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4 ">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  )
}

export default Player
