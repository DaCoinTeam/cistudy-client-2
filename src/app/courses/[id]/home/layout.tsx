"use client"
import { ReactNode } from "react"
import { HomeProviders } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return <HomeProviders>{children}</HomeProviders>
}

export default Layout
