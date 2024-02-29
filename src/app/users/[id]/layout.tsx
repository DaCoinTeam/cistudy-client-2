"use client"
import { ReactNode } from "react"
import { UserDetailsProviders } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <UserDetailsProviders>{children}</UserDetailsProviders>
}

export default Layout
