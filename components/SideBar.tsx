import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'

const SideBar = () => {
  const { data: session, status } = useSession()
  console.log(session)

  return (
    <div className="border-r border-gray-900 p-5 text-sm  text-gray-500">
      <div className="space-y-4 ">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white "
        >
          <HomeIcon className="h-5 w-5" />
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
        <p className="cursor-pointer text-white">Playlist Name......</p>
      </div>
    </div>
  )
}

export default SideBar
