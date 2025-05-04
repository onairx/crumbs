'use client'
import React from "react";
import SearchBarColor from "./SearchBarColor";
import SearchBarInput from "./SearchBarInput";

export default function Search() {
    return (
        <section className="w-full h-16 flex justify-center items-center">
            <div className="w-[5%] md:w-[20%] lg:w-[50%] h-full flex justify-start items-center overflow-x-clip">
                <SearchBarColor />
            </div>
            <SearchBarInput />
            <div className="w-[5%] md:w-[20%] lg:w-[50%]  h-full flex justify-start items-center overflow-x-clip rotate-180">
                <SearchBarColor />
            </div>
        </section>
    )
}