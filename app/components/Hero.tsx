import React from "react";
import Search from "./Search";
import Footer from "./Footer";
import { IBM_Plex_Mono } from "next/font/google";
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
})

export default function Hero() {
    return (
        <main className="w-full h-full">
            <section className="w-full h-[100vh] flex justify-center items-center flex-col">
                <div className="w-full h-full"></div>

                <div className="w-full h-full flex justify-center items-center flex-col gap-10">
                    <div className="w-full h-auto flex justify-center items-center flex-col gap-1">
                        <h1 className={`${ibmPlexMono.className} md:text-5xl text-4xl font-bold`}>Movie Crumbs</h1>
                        <p className="md:text-lg text-md text-[#9B9B9B]">All your movies in one search</p>
                    </div>
                    <Search />
                </div>

                <div className="w-full h-full flex justify-end items-center text-center flex-col">
                    <Footer />
                </div>
            </section>

        </main>
    )
}