// import Feed from '@components/Feed'

import dynamic from 'next/dynamic';

const Feed = dynamic(() => import('@components/Feed'), { ssr: false });


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

      <Feed />


    </section>
  )
}

export default Home