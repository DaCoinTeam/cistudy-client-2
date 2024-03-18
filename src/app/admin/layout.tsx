"use client"
import { ReactNode, Suspense } from "react"
import { AdminProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <AdminProvider>{children}</AdminProvider>
        </Suspense>
    )
}

export default Layout
