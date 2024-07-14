'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {

    const { data: session } = useSession();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState('')
    const searchParams = useSearchParams()
    const userId = searchParams.get('uid')
    
    // const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            const user = await fetch(`/api/users/${userId}`)
            const response = await fetch(`/api/users/${userId}/posts`)

            const res_data = await response.json()
            setPosts(res_data)
            const user_data = await user.json()
            setUser(user_data)
        }

        if (userId)
            fetchPosts()
    }, [])

    // const handleEdit = (post) => {
    //     router.push(`/update-prompt?id=${post.id}`)
    // }

    // const handleDelete = async (post) => {
    //     const hasConfirmed = confirm("Are you sure you want to delete?")

    //     if (hasConfirmed) {
    //         try {
    //             await fetch(`/api/prompt/${post.id}`, { method: 'DELETE' })

    //             const filteredPosts = posts.filter((p) => (p.id !== post.id))

    //             setPosts(filteredPosts)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    return (
        <Profile
            name={user.name}
            desc={`Welcome to ${user.name}'s profile.`}
            data={posts}
        />
    )
}

const Page = () => {
    return (
        <Suspense>
            <MyProfile />
        </Suspense>
    )
}

export default Page