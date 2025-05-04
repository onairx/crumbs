'use client'
import React from "react";
import { useSearchParams } from "next/navigation";
import SearchList from "./SearchList";
import ErrorPage from "./ErrorPage";

interface Movie {
    id: number;
    name?: string;
    title?: string;
    original_name?: string;
    first_air_date?: string;
    release_date?: string;
    origin_country?: string[];
    vote_average: number;
    poster_path: string;
    backdrop_path?: string;
    media_type?: string;
    [key: string]: any;
}

export default function ResultPage() {
    const searchParams = useSearchParams().get("query");
    const [theData, setTheData] = React.useState<Movie[] | null>(null)
    const [showError, setShowError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTheData(null)
        setShowError(false)
        setLoading(true)
        try {
            async function fetchData() {
                const res = await fetch(`https://api.themoviedb.org/3/search/multi?page=1&query=${searchParams}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
                const data = await res.json()
                if (data.results.length > 0) {
                    setTheData(data.results)
                } else if (data.results.length === 1) {
                    setTheData(data.results[0])
                } else {
                    setTheData(null)
                }
                setLoading(false)
            }
            fetchData()
        } catch (err) {
            console.log(err)
            setTheData(null)
            setLoading(false)
        }
    }, [searchParams])

    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (theData === null) {
            timeout = setTimeout(() => setShowError(true), 1500);
        } else {
            setShowError(false);
        }
        return () => clearTimeout(timeout);
    }, [theData])
    const theMulti = theData?.filter((item: Movie) => item.poster_path).map((item: Movie) => {
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
            {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <span className="text-lg">Loading...</span>
                </div>
            ) : (
                <>
                    <div className="w-auto h-auto mt-15 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5 gap-2">
                        {theMulti}
                    </div>
                    {theData === null && <ErrorPage />}
                </>
            )}
        </div>
    )
}