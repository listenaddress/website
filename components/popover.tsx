"use client";
import { useRef } from 'react';

interface PopoverProps {
    text: string;
}

function Popover({ text }: PopoverProps) {
    const ref = useRef<HTMLDivElement>(null);
    if (text.length > 70) {
        text = text.substring(0, 70) + "...";
    }

    return (
        <div className={`absolute bottom-10 z-10 left-[-100px] rounded-md bg-[#1B1B1D] text-white w-max`} ref={ref}>
            <div className="py-1 rounded-md">
                <p className="block px-4 py-2 text-sm font-medium">{text}</p>
            </div>
        </div>
    );
}

export default Popover;
