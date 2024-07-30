"use client"

import { ReactNode, Suspense } from "react"
import { AllCoursesProvider } from "./_hooks"
import { Spinner } from "@nextui-org/react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense fallback={<Spinner />}>
            <AllCoursesProvider>{children}</AllCoursesProvider>
        </Suspense>
    )
}

export default Layout
