"use client";
import { useState, useEffect, useContext } from 'react'
import { parseContentForTable } from '@/lib/helpers';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
import { ThemeContext } from '@/context/theme';

export default function Stream({ params }: {
    params: { slug: string }
}) {
    const { theme, _ } = useContext(ThemeContext) as any;
    const [stream, setStream] = useState({} as any)
    useEffect(() => {
        const fetchStream = async () => {
            const data = await fetch(process.env.NEXT_PUBLIC_API_URL + 'streams/' + params.slug)
            const streamRes = await data.json()
            if (!streamRes.results && typeof streamRes.results !== 'object') {
                return
            }
            streamRes.results = parseContentForTable(streamRes.results)
            setStream(streamRes)
        }
        fetchStream()
    }, [params.slug])

    return (
        <div className="max-w-[36rem] px-4 m-auto mt-28 mb-24 text-sm">
            {stream && stream.name && (
                <>
                    <h1 className="text-2xl font-bold">About this stream</h1>
                    <p className="mt-4">
                        {stream && stream.about}
                    </p>
                    <div>
                        <Link href={`/stream/${params.slug}`}>
                            <div className='text-blue-500 cursor-pointer mt-4'>
                                <span className='inline-block'>
                                    <ArrowLeftIcon width={18} strokeWidth={2} className='inline-block relative bottom-[2px] mr-2' />
                                </span>
                                Back to stream
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
