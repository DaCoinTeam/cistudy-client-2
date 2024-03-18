"use client"
import { ReactNode } from "react"
import { CourseDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <CourseDetailsProvider>{children}</CourseDetailsProvider>
}

export default Layout
