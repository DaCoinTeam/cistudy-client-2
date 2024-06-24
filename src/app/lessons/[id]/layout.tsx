"use client"
import { ReactNode } from "react"
import { LessonDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <LessonDetailsProvider>{children}</LessonDetailsProvider>
}

export default Layout
