import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'

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
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-5">
        <div className="bord flex cursor-pointer items-center space-x-3 rounded-full bg-red-300 p-1 pr-2 opacity-90 hover:opacity-80">
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
        <h1>hello world </h1>
      </section>
    </div>
  )
}

export default Center
