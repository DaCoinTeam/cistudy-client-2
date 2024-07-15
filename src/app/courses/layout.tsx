"use client"

import { ReactNode } from "react"
import { AllCoursesProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return <AllCoursesProvider>{children}</AllCoursesProvider>
}

export default Layout
