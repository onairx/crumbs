'use client'
import React from "react";
import Image from "next/image";
import Arrow from "@/public/assets/Arrow2.svg"
import SearchList from "../SearchList";
import { useParams, useSearchParams } from "next/navigation";

interface Movie {
    id: number;
    name?: string;
    title?: string;
    original_name?: string;
    release_date?: string;
    first_air_date?: string;
    tagline?: string;
    networks?: { name: string }[];
    origin_country?: string[];
    status?: string;
    vote_average: number;
    vote_count: number;
    homepage?: string;
    backdrop_path?: string;
    poster_path?: string;
    genres?: { name: string }[];
    type?: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    production_companies?: { name: string; logo_path: string }[];
    overview?: string;
}

export default function Page() {
    const searchParams = useSearchParams().get("media_type");
    const paramsId = useParams()
    const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
    const [similarMovies, setSimilarMovies] = React.useState<Movie[] | null>(null)

    React.useEffect(() => {
        try {
            const fetchMovie = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/${searchParams}/${paramsId.id}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}`)
                const data = await res.json()
                setSelectedMovie(data)
            }
            const fetchSimilar = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/${searchParams}/${paramsId.id}/similar?page=1&api_key=${process.env.NEXT_PUBLIC_API_TMDB}`)
                const data = await res.json()
                setSimilarMovies(data.results)
            }
            fetchSimilar()
            fetchMovie()
        } catch (error) {
            console.log(error)
        }

    }, [paramsId.id, searchParams])

    // React.useEffect(() => {
    //     console.log(similarMovies)
    // }, [selectedMovie])

    const similarMoviesCard = similarMovies && similarMovies.map((item: Movie) => {
        const theStyle = {
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }
        return (
            <SearchList
                key={item.id}
                item={{
                    ...item,
                    poster_path: item.poster_path || ''
                }}
                theStyle={theStyle}
            />
        )
    })

    const theStyle = selectedMovie && {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${selectedMovie.backdrop_path || selectedMovie.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }

    return (
        <>
            {
                selectedMovie && similarMovies &&
                <div className="w-full md:h-[100vh] h-full overflow-clip">
                    <div className="flex w-full h-full flex-col 
                        md:[mask-image:linear-gradient(to_bottom,transparent,#0a0a0a_15%,#0a0a0a_100%,transparent)]">
                        <div className="w-full lg:h-[40%] md:h-[30%] h-[20%] flex justify-start items-center mt-16" style={theStyle || undefined}>
                            <div className="w-[76%] md:w-[50%] h-full flex justify-center items-center border-r border-[#2D2D2D]
                                bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0ac2] to-[#0a0a0a5a] backdrop-blur-xl">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${selectedMovie?.poster_path || selectedMovie?.backdrop_path}`}
                                    alt={`${selectedMovie?.name || selectedMovie?.title} poster`}
                                    className="md:w-[13vw] w-22 h-auto"
                                />
                            </div>
                            <div className="w-full h-full"></div>
                            <div className="w-[50%] h-full"></div>
                        </div>
                        <div className="w-auto h-auto">
                            <div className="w-full lg:h-[55vh] md:h-[65vh] h-full md:flex md:flex-row flex-col justify-start items-center md:overflow-clip ">
                                <div className="lg:w-[57.3%] lg:max-w-[57.3%] md:w-[25%] w-full h-[55vh] md:h-full flex justify-center items-center">
                                    <div className="w-[90%] h-[90%] flex justify-between items-start flex-col">
                                        <div className="w-full h-full flex flex-col gap-2">
                                            <div>
                                                <div className="flex flex-wrap align-middle lg:gap-2 md:gap-0 items-center">
                                                    <h1 className="lg:text-2xl md:text-md text-md font-bold">{selectedMovie?.name || selectedMovie?.title}</h1>
                                                    {
                                                        selectedMovie?.original_name && selectedMovie?.original_name !== selectedMovie?.name &&
                                                        <p className="lg:text-sm md:text-xs text-xs">({selectedMovie?.original_name})</p>
                                                    }
                                                </div>
                                                <p className="text-[#909090] lg:text-md md:text-md text-sm">{selectedMovie?.release_date || selectedMovie?.first_air_date}</p>
                                            </div>
                                            <div>
                                                <h1>Tagline</h1>
                                                <p className="text-[#909090] lg:text-md md:text-md text-sm">{selectedMovie?.tagline ? selectedMovie?.tagline : "No tagline found"}</p>
                                            </div>
                                            <div>
                                                <h1 >Network & Country</h1>
                                                <div className="flex align-middle gap-2 items-center lg:text-md md:text-md text-sm">
                                                    {
                                                        selectedMovie?.networks ?
                                                            <p className="text-[#909090]">{selectedMovie?.networks[0]?.name},</p> :
                                                            <p className="text-[#909090]">Not available, </p>
                                                    }
                                                    <p className="text-[#909090]">
                                                        {selectedMovie?.origin_country && selectedMovie?.origin_country.length > 0
                                                            ? new Intl.DisplayNames(['en'], { type: 'region' }).of(selectedMovie?.origin_country[0])
                                                            : ""
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Current Status</h1>
                                                <p className="text-[#909090] lg:text-md md:text-md text-sm">{selectedMovie?.status}</p>
                                            </div>
                                            <div>
                                                <h1>Rating</h1>
                                                <div className="flex justify-start items-center gap-5 mt-2">
                                                    <div className="lg:text-lg md:text-md text-sm font-bold lg:px-10 lg:py-2 md:px-5 md:py-2 px-4 py-2 bg-[#E4A000] text-[#0a0a0a]">
                                                        {selectedMovie?.vote_average.toFixed(1)}
                                                    </div>
                                                    <p className="text-[#909090] lg:text-md md:text-md text-sm">{selectedMovie?.vote_count} votes</p>
                                                </div>
                                            </div>
                                        </div>


                                        <a href={selectedMovie?.homepage} className="w-full h-14 cursor-pointer">
                                            <div className="bg-[#191919] text-[#f7f7f7] w-full h-full cursor-pointer border border-[#2D2D2D]">
                                                <button className="flex justify-center items-center gap-2 lg:text-xl md:text-md text-sm w-full h-full">
                                                    Official Website
                                                    <Image src={Arrow} alt="arrow" className="lg:w-3 lg:h-3 md:w-2 md:h-2 w-auto h-auto" />
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="lg:w-full md:w-[30%] w-full md:h-full lg:h-full h-auto flex justify-center items-center md:py-0 p-4 md:border-x md:border-[#2D2D2D]">
                                    <div className="md:w-[95%] md:h-[90%] flex justify-between gap-0 items-start flex-col overflow-clip">
                                        <div className="flex justify-between gap-3 items-start flex-col">
                                            <div>
                                                <h1 className="lg:text-xl md:text-md text-md font-bold">Overview</h1>
                                                <p className="text-[#909090] lg:text-md md:text-md text-sm">{selectedMovie?.overview}</p>
                                            </div>
                                            <div>
                                                {
                                                    selectedMovie?.genres && selectedMovie?.genres.length > 0 &&
                                                    <div>
                                                        <div className="flex gap-2 flex-wrap w-auto h-auto ">
                                                            {
                                                                selectedMovie?.genres.map((item: { name: string }, index: number) => {
                                                                    return (
                                                                        <p key={index}
                                                                            className="text-[#f7f7f7] text-md lg:px-10 lg:py-2 border 
                                                                        border-[#2D2D2D] bg-[#191919] lg:text-md md:text-md text-sm
                                                                        md:px-5 md:py-2 px-4 py-2">{item.name}
                                                                        </p>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="text-[#909090]">
                                                {
                                                    selectedMovie?.type && selectedMovie?.number_of_seasons && selectedMovie?.number_of_episodes &&
                                                    <div className="flex flex-wrap gap-5 lg:text-md md:text-md text-sm">
                                                        <p className="text-md text-md">Type: {selectedMovie?.type}</p>
                                                        <p className="text-md text-md">Seasons: {selectedMovie?.number_of_seasons}</p>
                                                        <p className="text-md text-md">Episodes: {selectedMovie?.number_of_episodes}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="lg:block md:hidden hidden">
                                            <h1 className="text-md text-md font-bold py-2">Production Companies</h1>
                                            {
                                                selectedMovie?.production_companies &&
                                                <div className="flex gap-5 w-auto h-auto">
                                                    {selectedMovie?.production_companies.map((item: { name: string; logo_path: string }, index: number) => {
                                                        return (
                                                            <div key={index} className="bg-[#f7f7f7] px-5 py-2">

                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
                                                                    alt={item.name}
                                                                    className="w-auto h-5"
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-[50%] md:w-[45%] w-full h-full">
                                    <div className="w-full h-10">
                                        <div className="w-full h-full hidden md:block">
                                            <h1 className="w-full h-full bg-[#E4A000] text-[#0a0a0a]
                                            flex justify-center items-center text-center align-middle font-bold"
                                            >
                                                Similar Genres
                                            </h1>
                                        </div>
                                        <div className="w-full h-full block md:hidden">
                                            <h1 className="w-full h-full bg-[#E4A000] text-[#0a0a0a]
                                            flex justify-center items-center text-center align-middle font-bold"
                                            >
                                                Swipe left for more
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex md:flex-col overflow-y-scroll overflow-auto">
                                        {similarMoviesCard}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
