"use client";
import { useState, useEffect, useContext } from 'react'
import { parseContentForTable } from '@/lib/helpers';
import { ArrowUpRightIcon, SparklesIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { ThemeContext } from '@/context/theme';
import Popover from '@/components/popover';

export default function Stream({ params }: {
    params: { slug: string }
}) {
    const [stream, setStream] = useState({ results: [] })
    const [summariesOpened, setSummariesOpened] = useState([])
    const [moreOptionsHover, setMoreOptionsHover] = useState(-1)
    const { theme, _ } = useContext(ThemeContext) as any;

    useEffect(() => {
        const fetchStream = async () => {
            const data = await fetch(process.env.NEXT_PUBLIC_API_URL + 'streams/' + params.slug)
            const streamRes = await data.json()
            if (!streamRes.results && typeof streamRes.results !== 'object') {
                return
            }
            console.log(streamRes)
            streamRes.results = parseContentForTable(streamRes.results)
            setStream(streamRes)
        }
        fetchStream()
    }, [params.slug])

    type PlatformToString = {
        [key: string]: string;
    }

    const platformToLabelString: PlatformToString = {
        substack: 'Article on Substack',
        spotify: 'Podcast on Spotify'
    }
    const platformToCTAString: PlatformToString = {
        substack: 'Read on Substack',
        spotify: 'Listen on Spotify'
    }

    return (
        <div className="max-w-[36rem] px-4 m-auto mt-12 mb-24 text-sm">
            {stream.results && stream.results.map((result: any, index: number) => {
                const labelString = platformToLabelString[result.venue]
                const createdAt = moment(result.createdAt);
                const now = moment();
                let date;
                if (now.diff(createdAt, 'months') >= 5 && now.format('YYYY') !== createdAt.format('YYYY')) {
                    date = createdAt.format('YYYY')
                } else if (now.diff(createdAt, 'weeks') >= 1) {
                    date = createdAt.format('MMMM D')
                } else if (now.diff(createdAt, 'days') >= 1) {
                    if (now.diff(createdAt, 'days') == 1) {
                        date = 'Yesterday'
                    } else {
                        date = createdAt.format('dddd');
                    }
                } else {
                    const duration = moment.duration(now.diff(createdAt));
                    if (duration.asHours() >= 1) {
                        date = Math.floor(duration.asHours()) + 'h ago';
                    } else if (duration.asMinutes() >= 1) {
                        date = Math.floor(duration.asMinutes()) + 'm ago';
                    } else {
                        date = Math.floor(duration.asSeconds()) + 's ago';
                    }
                    console.log(date);
                }

                const parseToArray = (summary: string) => {
                    const regex = /\d+\.\s(.*?)(?=\s\d+\.|$)/gs;
                    const result: string[] = [];

                    let match;
                    while ((match = regex.exec(summary)) !== null) {
                        if (match.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }

                        match.forEach((match, groupIndex) => {
                            if (groupIndex === 1) { // We only want the captured group (the actual list item text)
                                result.push(match);
                            }
                        });
                    }

                    if (result.length === 0) {
                        throw new Error('Unable to parse the summary');
                    }

                    return result;
                };
                try {
                    result.summaryArray = parseToArray(result.summary);
                    console.log(result.summaryArray);
                } catch (e) {
                    console.error(e);
                }

                return (
                    <div className="mt-6" key={index}>
                        <div>
                            <Link href={result.url}>
                                <Image
                                    src={result.platformImage}
                                    alt={result.title}
                                    width={24}
                                    height={24}
                                    className='inline-block relative bottom-[2px] mr-2'
                                />
                                <p className={`inline-block`}>
                                    {labelString}
                                </p>
                                <p className='inline-block ml-2 text-gray-500'>
                                    ·
                                </p>
                                <p className='inline-block ml-2 text-gray-500'>
                                    {date}
                                </p>
                            </Link>
                        </div>
                        <Link href={result.url}>
                            <h1 className='text-xl md:text-2xl font-bold mt-3'>
                                {result.title}
                            </h1>
                        </Link>
                        <p className='mt-2 mb-4 text-gray-600'>
                            By {result.authors}
                        </p>
                        <div className='my-4 bg-gray-300 rounded-xl'>
                            <div className='p-6 pb-7'>
                                <div className='mb-2'>
                                    <SparklesIcon width={22} strokeWidth={2} className='inline-block relative bottom-[2px] mr-2' />
                                    <p className='inline-block font-[600]'>
                                        Summary
                                    </p>
                                </div>
                                {result.summaryArray && result.summaryArray.map((summary: string, index: number) => {
                                    return (
                                        <div className="relative px-[2.65rem] pr-[1rem]" key={index}>
                                            <span className='text-bold text-2xl absolute left-[1.9rem] top-[-5px]'>·</span>
                                            <span key={index}>
                                                {summary}
                                                <br />
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='my-4'>
                            <Link href={result.url} className='text-blue-500 cursor-pointer'>
                                <ArrowUpRightIcon width={18} strokeWidth={2} className='inline-block relative bottom-[2px] mr-2' />
                                {platformToCTAString[result.venue]}
                            </Link>
                        </div>
                        <div className='my-4 relative'>
                            <div
                                className='text-blue-500 cursor-pointer'
                                onMouseOver={() => setMoreOptionsHover(index)}
                                onMouseLeave={() => setMoreOptionsHover(-1)}
                            >
                                <EllipsisHorizontalIcon width={18} strokeWidth={2} className='inline-block relative bottom-[2px] mr-2' />
                                More options
                            </div>
                            {moreOptionsHover === index && (
                                <Popover
                                    text='Coming soon'
                                    left={'0'}
                                    bottom={'30'}
                                />
                            )}
                        </div>
                        {index !== stream.results.length - 1 && (
                            <div className={`h-[2px] bg-gray-100 my-8`}></div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}