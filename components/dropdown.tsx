import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from "@/context/theme";

interface DropdownProps {
    items: any[];
}

function Dropdown({ items }: DropdownProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { theme, _ } = useContext(ThemeContext) as any;
    console.log(theme)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            // setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div className={`absolute top-5 z-10 mt-2 w-56 rounded-md bg-white border-${theme}-border-primary border-2`} ref={ref}>
            <div className="py-1 rounded-md bg-white shadow-xs">
                {items.map((item: string, index: number) => (
                    <a key={index} className={`block px-4 py-2 text-sm font-medium hover:bg-[#F2F2F6] cursor-pointer`}>{item}</a>
                ))}
            </div>
        </div>
    );
}

export default Dropdown;
