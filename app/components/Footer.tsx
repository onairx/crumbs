import React from "react";
import Image from "next/image";
import TMDBImage from "@/public/assets/tmdb-logo.svg"

export default function Footer() {
    return (
        <footer className="w-full h-auto">
            <div className="flex flex-col justify-center items-center gap-1 p-2">
                <Image src={TMDBImage} alt="tmdb logo" className="w-auto lg:h-3 md:h-2 h-2" />
                <p className="text-[#484848] md:text-sm text-sm hidden md:block">
                    This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
                </p>
                <p className="text-[#484848] text-[0.7em] md:hidden block">
                    Powered by TMDB, but not endorsed or certified by TMDB.
                </p>
                <p className="text-[#929292] md:text-sm text-[0.7em]">
                    <a href="https://vishalonairx.vercel.app">Designed and developed by onairx
                    </a>
                </p>
            </div>
        </footer>
    )
}