import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState, useRecoilStoreID } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

const SideBar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlist, setPlaylist] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="hidden h-screen overflow-y-scroll
     border-r border-gray-900 p-5 pb-36 text-xs 
      text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] 
      lg:text-sm
      "
    >
      <div className="space-y-4 ">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white "
        >
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5" />
          <p>home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.2px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusIcon className="h-5 w-5" />
          <p>Create playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5" />
          <p>Your episods</p>
        </button>
        <hr className="border-t-[0.2px] border-gray-900" />

        {/* playlists  */}

        {playlist.map((list) => (
          <p
            key={list.id}
            id={list.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(list.id)}
          >
            {list.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default SideBar
