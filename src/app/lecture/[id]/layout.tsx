"use client"
import { ReactNode } from "react"
import { LectureDetailsProviders } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <LectureDetailsProviders>{children}</LectureDetailsProviders>
}

export default Layout
