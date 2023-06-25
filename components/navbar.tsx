"use client";
import Button from './button'
import { ThemeContext } from "@/context/theme"
import React, { useEffect, useState, useContext } from "react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import Dropdown from './dropdown'
import Link from 'next/link'

export default function Navbar() {
    const router = useRouter()
    const { theme, _ } = useContext(ThemeContext) as any;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const [activePage, setActivePage] = useState('streams');
    const pathname = usePathname()
    const stream = pathname?.match(/^\/stream\/([^\/]+)/)?.[1]

    const dropdownItems = [{
        text: 'About Streams',
        href: '/about',
        icon: QuestionMarkCircleIcon
    }];

    const streamDropdownItems = [{
        text: 'About this stream',
        href: `/stream/${stream}/about`,
        icon: QuestionMarkCircleIcon
    }];

    const slugToName: { [key: string]: string } = {
        "longevity": "Longevity"
    }

    useEffect(() => {
        const urlToPage = [{
            href: '',
            page: 'home'
        }, {
            href: '/about',
            page: 'about'
        }, {
            href: '/stream/[slug]',
            page: 'stream'
        }, {
            href: '/stream/[slug]/about',
            page: 'about-stream'
        }];

        const page = urlToPage.find((page) => pathname?.startsWith(page.href))
        if (page) {
            setActivePage(page.page)
        }
        const isAStream = pathname?.match(/^\/stream\/[^\/]+$/)
        if (isAStream) {
            setActivePage('stream')
        }
    }, [pathname])

    // const getDropdownLeft = () => {
    //     // Get width of the window
    //     const windowWidth = window.innerWidth
    //     // If the screen is small, the left value should be 0
    // Otherwise it should be 4.5

    const getDropdownLeft = () => {
        const windowWidth = window.innerWidth
        if (windowWidth < 767) {
            return '0'
        } else {
            return '4.5'
        }
    }

    return (
        <div className='fixed w-full top-0 z-10'>
            <nav className={`flex items-center justify-between flex-wrap bg-white py-3 px-4 sm:px-6 lg:px-8 border-b-2 border-${theme}-border-primary`}>
                <div className="flex items-center flex-shrink-0 relative">
                    {activePage === 'home' && (
                        <>
                            <span onClick={toggleDropdown} className="font-medium text-sm tracking-tight cursor-pointer">
                                Streams
                                <ChevronDownIcon style={{
                                    width: "23px",
                                    display: "inline-block",
                                    marginLeft: "1px",
                                    position: "relative",
                                    bottom: "1px"
                                }} />
                            </span>
                            {dropdownOpen && <Dropdown items={dropdownItems} setIsOpen={toggleDropdown} />}
                        </>
                    )
                    }
                    {
                        activePage === 'stream' && (
                            <div className="font-medium text-sm">
                                {/* Only display the div below on medium screens and above */}
                                <div className="hidden md:inline-block">
                                    <Link href="/">
                                        <span className="font-medium text-sm tracking-tight cursor-pointer text-gray-600">
                                            Streams
                                        </span>
                                    </Link>
                                    <span className='px-2 text-gray-400'>/</span>
                                </div>
                                <span onClick={toggleDropdown} className="tracking-tight cursor-pointer">
                                    {slugToName[pathname?.split('/')[2] || 'Untitled']}
                                    <ChevronDownIcon style={{
                                        width: "23px",
                                        display: "inline-block",
                                        marginLeft: "1px",
                                        position: "relative",
                                        bottom: "1px"
                                    }} />
                                </span>
                                {dropdownOpen && <Dropdown left={getDropdownLeft()} items={streamDropdownItems} setIsOpen={toggleDropdown} />}
                            </div>
                        )
                    }
                </div >
                <div className="flex flex-grow items-center w-auto">
                    <div className="text-sm flex-grow">
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={() => router.push('/sign-in')}
                            size='sm'
                            variant='blue'
                        >
                            Request Access
                        </Button>
                    </div>
                </div>
            </nav >
        </div >
    )
}
