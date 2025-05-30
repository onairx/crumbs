'use client'
import React, { Suspense } from "react";
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
}

function ResultPageContent() {
    const searchParams = useSearchParams().get("query");
    const [theData, setTheData] = React.useState<Movie[] | null>(null)
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTheData(null)
        setLoading(true)
        try {
            async function fetchData() {
                const res = await fetch(`/api/multi?query=${searchParams}`)
                const data = await res?.json()
                if (data.results && data.results.length > 0) {
                    setTheData(data.results)
                } else if (data.results && data.results.length === 1) {
                    setTheData([data.results[0]])
                } else {
                    setTheData([])
                }
                setLoading(false)
            }
            fetchData()
        } catch (error) {
            setTheData([])
            setLoading(false)
            if (error) {
                console.log("Something went wrong");
            }
        }
    }, [searchParams])

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

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center w-full h-full"><span className="text-lg">Loading...</span></div>}>
            <ResultPageContent />
        </Suspense>
    )
}