"use client"
import { ReactNode } from "react"
import { HomeProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return <HomeProvider>{children}</HomeProvider>
}

export default Layout
