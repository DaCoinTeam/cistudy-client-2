"use client"
import { ReactNode } from "react"
import { CourseDetailsProviders } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <CourseDetailsProviders>{children}</CourseDetailsProviders>
}

export default Layout
