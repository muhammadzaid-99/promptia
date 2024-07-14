import Feed from '@components/Feed'
import { Suspense } from 'react'

const Home = () => {
  return (

    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden " />
        <span className="orange_gradient text-center"> AI-Powered Prompts
        </span>
      </h1>

      <p className="desc text-center">
        Promptia is a platform for discovering and sharing AI-generated prompts.

      </p>

      <Suspense>
        <Feed />
      </Suspense>

    </section>
  )
}

export default Home