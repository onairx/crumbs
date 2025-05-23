'use client'
import React, { useState } from 'react';
import SearchList from '../SearchList';

interface TrendingItem {
    id: number;
    poster_path: string;
    backdrop_path?: string;
    media_type?: string;
    vote_average: number;
}

export default function Trending() {
    const [trending, setTrending] = useState<TrendingItem[] | null>(null)
    React.useEffect(() => {
        try {
            const fetchTrending = async () => {
                const res = await fetch(`/api/trending`)
                const data = await res.json()
                setTrending(data)
            }
            fetchTrending()
        } catch (error) {
            if (error) {
                console.log("Something went wrong");
            }
        }
    }, [])



    const trendingCard = trending?.filter((item: TrendingItem) => item.poster_path).map((item: TrendingItem) => {
        const theStyle = {
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }
        return (
            <SearchList
                key={item.id}
                item={item}
                theStyle={theStyle}
            />
        )
    })

    return (
        <div className="w-full h-screen flex flex-col overflow-y-scroll scroll-smooth overflow-x-clip md:p-5 items-center">
            <div className='w-auto h-auto mt-15 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5 gap-2'>
                {trendingCard}
            </div>
        </div>
    )
}