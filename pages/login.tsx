import { getProviders, signIn } from 'next-auth/react'

const login = ({ providers }: any) => {
  return (
    <div>
      <img src="https:/links.papareact.com/9xl" alt="logo" className="" />
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
