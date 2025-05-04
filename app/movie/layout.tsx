import React from "react";
import NavLayout from "./NavLayout";

export default function Layout({ children }: any) {
    return (
        <div>
            <NavLayout />
            {children}
        </div>
    )
}