"use client"
import { ReactNode } from "react"
import { ManageProviders } from "./ManageProviders"

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <ManageProviders>{children}</ManageProviders>
}

export default RootLayout
