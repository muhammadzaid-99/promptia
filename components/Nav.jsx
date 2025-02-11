'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])


    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30}
                    className='object-contain' />
                <p className='logo_text'>
                    Promptia
                </p>
            </Link>

            {/* {alert(providers)} */}

            {/* Desktop Navigation */}

            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-3'>
                        <Link href="/create-prompt" className='black_btn' >
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/profile/my">
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                alt="profile"
                                className='rounded-full object-contain'
                            />
                            {/* {session?.user.name} */}
                        </Link>
                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'
                                >
                                    Sign In with {provider.name}
                                    {/* Sign In */}
                                </button>
                            ))
                        }
                    </>
                )}
            </div>

            {/* Mobile Navigation */}

            <div className='sm:hidden flex relative' >
                {session?.user ? (
                    <div className='flex'>
                        <Image src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                            className='rounded-full object-contain'
                        />
                        {
                            toggleDropdown && (
                                <div className='dropdown'>
                                    <Link
                                        href="/profile/my"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Post
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                        className='mt-5 w-full black_btn'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'
                                >
                                    Sign In with {provider.name}
                                </button>
                            ))
                        }
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav