"use client"
import { ReactNode } from "react"
import { LectureDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <LectureDetailsProvider>{children}</LectureDetailsProvider>
}

export default Layout
