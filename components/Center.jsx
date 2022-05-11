import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-white',
]

const Center = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('something went wrong !', err))
  }, [spotifyApi, playlistId])
  return (
    <div className="scrollbar h-screen flex-grow overflow-y-scroll">
      <header className="absolute top-5 right-5">
        <div className="bord flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full border-2 border-blue-800"
            src={session?.user?.image || ''}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon />
        </div>
      </header>

      <section
        className={`flex h-80 w-full items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img className="h-44 w-44" src={playlist?.images[0].url} alt="" />

        <div>
          <p>playlist name :</p>
          <h1 className="border-solid text-2xl">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
