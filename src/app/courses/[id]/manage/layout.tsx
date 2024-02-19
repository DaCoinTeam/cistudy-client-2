"use client"
import { ReactNode } from "react"
import { ManageProviders } from "./_hooks/ManageProviders"

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <ManageProviders>{children}</ManageProviders>
}

export default RootLayout
