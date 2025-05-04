import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IBM_Plex_Mono } from "next/font/google";
import SearchIcon from "@/public/assets/search-icon.svg"
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
})

export default function SearchBarInput() {
    const router = useRouter();
    const [theSearch, setTheSearch] = React.useState("")
    function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (theSearch.trim()) {
            router.push(`/movie?query=${theSearch}`)
        }
    }
    return (
        <form
            className="w-full h-full flex justify-between items-center border border-[#2D2D2D]"
            onSubmit={handleClick}
        >
            <input
                type="text"
                placeholder="search your favorite movies"
                className={`${ibmPlexMono.className} w-full h-full md:p-5 md:pl-10 p-2 focus:outline-none 
                md:text-sm lg:text-normal text-xs`}
                name="search"
                value={theSearch}
                onChange={(e) => setTheSearch(e.target.value)}

            />
            <button
                type="submit"
                className="lg:w-[10vw] md:w-[15vw] w-[20vw] border-l h-full border-[#2D2D2D] flex justify-center items-center cursor-pointer"
            >
                <Image src={SearchIcon} alt="search icon" className="md:w-auto md:h-6 lg:w-auto lg:h-8 w-5 h-5 " />
            </button>
        </form>
    )
}