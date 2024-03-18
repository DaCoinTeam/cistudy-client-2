"use client"
import { ReactNode } from "react"
import { UserDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <UserDetailsProvider>{children}</UserDetailsProvider>
}

export default Layout
