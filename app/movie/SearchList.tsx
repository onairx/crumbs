'use client'
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import Link from "next/link";

export default function SearchList({ item, theStyle }: any) {
    return (
        <Link
            key={item.id}
            href={`/movie/${item.id}?media_type=${item.media_type ? item.media_type : "tv"}`}
        >
            <div
                key={item.id}
                className="md:w-[45vw] md:h-[35vh] lg:w-[30vw] lg:h-[35vh] w-[100vw] h-[20vh] border border-[#2d2d2d] overflow-clip"
            >
                <div className="w-full h-full relative" style={theStyle}>
                    <div className="w-full h-full bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0ac2] to-[#0a0a0a5a] 
                            absolute backdrop-blur-xl">
                    </div>

                    <div className="w-full h-full flex justify-start items-center absolute md:p-5 p-2">
                        <div className="md:w-[80%] w-[50vw] h-full">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={`${item.name} poster`}
                                className="object-cover object-center w-full h-full"
                            />
                        </div>
                        <div className="w-full h-full md:p-5 p-2">
                            <div className="w-full h-full flex flex-col items-start justify-between ">
                                <div className="flex flex-col ">
                                    <h1 className="md:text-xl text-md font-bold">{item.name || item.title}</h1>
                                    {
                                        item.original_name && item.original_name !== item.name &&
                                        <p className="text-xs">({item.original_name})</p>
                                    }
                                </div>
                                <div className=" w-full h-auto">
                                    <p className="hidden md:block">{item.first_air_date || item.release_date}</p>
                                    <p className="hidden md:block">
                                        {item.origin_country && item.origin_country.length > 0
                                            ? new Intl.DisplayNames(['en'], { type: 'region' }).of(item.origin_country[0])
                                            : ""
                                        }
                                    </p>
                                    <div className="flex align-middle gap-2 items-center">
                                        <p>{item.vote_average.toFixed(1)}</p>
                                        <TiStarFullOutline className="text-yellow-500" />
                                    </div>
                                </div>

                                <button className="w-fit h-fit py-2 border border-[#2d2d2d] lg:px-5 md:px-5 px-5 text-center cursor-pointer
                                    bg-[#0a0a0a] text-[#a3a3a3] text-sm">
                                    view details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}