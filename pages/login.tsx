import { getProviders, signIn } from 'next-auth/react'

const login = ({ providers }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <img
        src="https:/links.papareact.com/9xl"
        alt="logo"
        className="mb-5 w-52"
      />

      {Object.values(providers).map((provider: any) => (
        <button
          key={provider.name}
          className="rounded-full bg-[#18d860] p-5 text-white"
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
        >
          Login with {provider.name}
        </button>
      ))}
    </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
