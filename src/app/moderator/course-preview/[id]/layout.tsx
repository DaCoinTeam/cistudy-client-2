"use client"
import { ReactNode, Suspense } from "react"
import { CoursePreviewProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <CoursePreviewProvider>
                {children}
            </CoursePreviewProvider>
        </Suspense>
    )
}

export default Layout
