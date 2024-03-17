"use client"
import { ReactNode, Suspense } from "react"
import { AdminProviders } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <AdminProviders>{children}</AdminProviders>
        </Suspense>
    )
}

export default Layout
