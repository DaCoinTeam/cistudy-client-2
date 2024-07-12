"use client"
import { ReactNode } from "react"
import { LessonPreviewProvider } from "./_hooks" 
const Layout = ({ children }: { children: ReactNode }) => {
    return <LessonPreviewProvider>{children}</LessonPreviewProvider>
}

export default Layout
