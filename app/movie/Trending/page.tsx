'use client'
import React from 'react';
import SearchList from '../SearchList';

export default function Trending() {
    const [trending, setTrending] = React.useState<any>(null)
    React.useEffect(() => {
        try {
            const fetchTrending = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
                const data = await res.json()
                setTrending(data.results)
            }
            fetchTrending()
        } catch (error) {
            console.log(error)
        }
    })



    const trendingCard = trending?.filter((item: any) => item.poster_path).map((item: any) => {
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