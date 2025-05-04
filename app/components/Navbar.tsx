import React from "react";
import { IBM_Plex_Mono } from "next/font/google";
import LogoElents from "@/public/assets/logo-elements.svg"
import Link from "next/link";
import Image from "next/image";
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
})

export default function Navbar() {
    return (
        <nav className="w-full h-auto px-5 py-2 bg-transparent absolute z-20">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <div className="w-auto h-auto relative">
                        <Image src={LogoElents} alt="logo elents"
                            className="absolute left-[40%] md:-top-[8%] -top-[2%] pointer-events-none
                        w-auto h-10 md:w-auto md:h-auto" />
                        <h1 className={`${ibmPlexMono.className} md:text-[2.2em] font-[700] text-[1.5em]
                        bg-gradient-to-b from-[#f7f7f7] to-[#6B6B6B] text-transparent bg-clip-text`}>
                            Crumbs
                        </h1>
                    </div>
                </Link>
                <Link href="../movie/Trending">
                    <div className="border md:px-6 md:py-3 px-4 py-2 border-[#2D2D2D] cursor-pointer bg-gradient-to-r 
                        from-[#2278fb] to-[#6bdfdb] text-transparent bg-clip-text backdrop-blur-xl">
                        <h3 className="md:text-md text-xs">Trending This Week</h3>
                    </div>
                </Link>
            </div>
        </nav>
    )
}