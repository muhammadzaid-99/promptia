'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

import Form from "@components/Form"

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const { data: session } = useSession()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            if (session?.user.id == data.user_id)  {
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                })
            } else {
                router.push('/profile/my')
            }
        }

        if (promptId)
            getPromptDetails()

    }, [searchParams])


    const updatePrompt = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        if (!promptId)
            alert('Missing prompt info')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })

            if (response.ok) {
                router.push('/profile/my');
            }

        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt