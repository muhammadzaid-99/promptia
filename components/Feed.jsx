'use client'

import { useState, useEffect, useRef } from 'react'
import PromptCard from '@components/PromptCard'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const timeoutRef = useRef(null);
  const searchParams = useSearchParams()
  const router = useRouter()

  

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      // try {
        // const response = await fetch(`/api/search?query=${query}`);
        // const data = await response.json();
        if (query == "")
          setFilteredPosts(posts)

        const filtered = posts.filter((post) => 
          post.prompt.toLowerCase().includes(query) || 
          post.tag.toLowerCase().includes(query) || post.name.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
      // } catch (error) {
      //   console.error('Error fetching search results:', error);
      // }
    }, 100);
  }

  const handleTagClick = (tag) => {
    const filteredPosts = posts.filter((post) => post.tag == tag)
    setPosts(filteredPosts)
    router.push(`/?tag=${tag}`)
  }


  useEffect(() => {
    const fetchPosts = async () => {

      const response = await fetch('/api/prompt', {
        next: {
          revalidate: 5
        }
      })
      const data = await response.json()
      setPosts(data)
      setFilteredPosts(data)
    }
   
    if (!searchParams.get('tag')) {
      fetchPosts();
    }
  }, [searchParams])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search a prompt, tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

const FeedComponent = () => {
  return (
      <Suspense>
          <Feed />
      </Suspense>
  )
}

export default FeedComponent