import type { NextPage } from 'next'
import Head from 'next/head'
import Center from '../components/Center'
import SideBar from '../components/SideBar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <SideBar />
        <Center />
      </main>

      <div>{/* player */}</div>
    </div>
  )
}

export default Home
