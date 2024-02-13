"use client"
import { ReactNode } from "react"
import { CourseDetailsProviders } from "./_hooks"
const RootLayout = ({ children }: { children: ReactNode }) => {
    return <CourseDetailsProviders>{children}</CourseDetailsProviders>
}

export default RootLayout
