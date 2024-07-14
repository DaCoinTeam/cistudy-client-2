"use client"
import { ReactNode, Suspense } from "react"
import { ModeratorProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <ModeratorProvider>{children}</ModeratorProvider>
        </Suspense>
    )
}

export default Layout
