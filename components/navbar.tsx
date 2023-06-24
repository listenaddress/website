"use client";
import Button from './button'
import { ThemeContext } from "@/context/theme"
import React, { useEffect, useState, useContext } from "react"
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const { theme, _ } = useContext(ThemeContext) as any;
    const router = useRouter();

    return (
        <nav className={`flex items-center justify-between flex-wrap bg-white py-3 px-4 sm:px-6 lg:px-8 border-b-2 border-${theme}-border-primary`}>
            <div className="flex items-center flex-shrink-0 mr-6">
                <span className="font-medium text-sm tracking-tight">Streams</span>
            </div>
            <div className="flex flex-grow items-center w-auto">
                <div className="text-sm flex-grow">
                </div>
                <div className="flex justify-end">
                    {/* <Button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        size='sm'
                        secondary
                        style={{ marginRight: '1.25rem' }}
                    >
                        Login
                    </Button> */}
                    <Button
                        // Go to /signin page on click
                        onClick={() => router.push('/sign-in')}
                        size='sm'
                        secondary
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </nav>
    )
}
