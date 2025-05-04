import React from "react";
import NavLayout from "./NavLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavLayout />
            {children}
        </div>
    )
}