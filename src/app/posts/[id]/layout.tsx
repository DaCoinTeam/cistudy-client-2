"use client"

import { ReactNode, Suspense } from "react"
import { Spinner } from "@nextui-org/react"
import { PostDetailProvider } from "./hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense fallback={<Spinner />}>
            <PostDetailProvider>
                {children}
            </PostDetailProvider>
        </Suspense>
    )
}

export default Layout
