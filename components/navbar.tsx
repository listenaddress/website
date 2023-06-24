"use client";
import Button from './button'
import { ThemeContext } from "@/context/theme"
import React, { useEffect, useState, useContext } from "react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import Dropdown from './dropdown'

export default function Navbar() {
    const { theme, _ } = useContext(ThemeContext) as any;
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const dropdownItems = [{
        text: 'About Streams',
        href: '/about'
    }, {
        text: 'RSS',
        href: '/rss'
    }];

    return (
        <nav className={`flex items-center justify-between flex-wrap bg-white py-3 px-4 sm:px-6 lg:px-8 border-b-2 border-${theme}-border-primary`}>
            <div className="flex items-center flex-shrink-0 relative">
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
                {dropdownOpen && <Dropdown items={dropdownItems} />}
            </div>
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
        </nav>
    )
}
