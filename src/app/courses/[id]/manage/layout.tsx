"use client"
import { ReactNode } from "react"
import { ManageProviders } from "./_hooks/ManageProviders"

const Layout = ({ children }: { children: ReactNode }) => {
    return <ManageProviders>{children}</ManageProviders>
}

export default Layout
