"use client"
import { ReactNode } from "react"
import { ManagementProviders } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return <ManagementProviders>{children}</ManagementProviders>
}

export default Layout