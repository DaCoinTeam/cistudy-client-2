"use client"
import { ReactNode } from "react"
import { ForumProviders } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <ForumProviders>{children}</ForumProviders>
}

export default Layout
