"use client"
import { ReactNode } from "react"
import { ManagementProvider } from "./_hooks/ManagementProvider"

const Layout = ({ children }: { children: ReactNode }) => {
    return <ManagementProvider>{children}</ManagementProvider>
}

export default Layout
