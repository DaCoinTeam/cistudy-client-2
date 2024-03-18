"use client"
import { ReactNode, Suspense } from "react"
import { ManagementProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <ManagementProvider>{children}</ManagementProvider>
        </Suspense>
    )
}

export default Layout
