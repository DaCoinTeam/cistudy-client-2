"use client"
import { ReactNode, Suspense } from "react"
import { ManagementProviders } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <ManagementProviders>{children}</ManagementProviders>
        </Suspense>
    )
}

export default Layout
