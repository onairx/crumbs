'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../components/SearchBarInput";
import LogoElents from "../../public/assets/logo-elements.svg";
import { IBM_Plex_Mono } from "next/font/google";
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function NavLayout() {
    return (
        <div className="w-full h-16 flex absolute bg-[#0a0a0a] z-30">
            <Link href="/" className="w-[50%] h-full border-y border-[#2D2D2D] flex justify-center items-center">
                <div>
                    <div className="w-auto h-auto relative">
                        <Image src={LogoElents} alt="logo elents" className="absolute left-[40%] md:-top-[8%] -top-[30%]
                        pointer-events-none w-auto h-10 md:w-auto md:h-14" />
                        <h1 className={`${ibmPlexMono.className} md:text-[2em] font-[700] text-[1em]
                                bg-gradient-to-b from-[#f7f7f7] to-[#6B6B6B] text-transparent bg-clip-text`}>
                            Crumbs
                        </h1>
                    </div>
                </div>
            </Link>
            <SearchBar />
            <Link
                href="/movie/Trending"
                className="w-[50%] h-full border-y border-[#2D2D2D] cursor-pointer hidden md:block"
            >
                <div className="w-full h-full text-[1em] flex justify-center items-center">
                    <div className="bg-gradient-to-r from-[#2278fb] to-[#6bdfdb] text-transparent bg-clip-text">
                        Trending This Week
                    </div>
                </div>
            </Link>
        </div>
    )
}