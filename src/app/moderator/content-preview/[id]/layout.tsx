"use client"
import { ReactNode } from "react"
import { SectionContentPreviewProvider } from "./_hooks" 
const Layout = ({ children }: { children: ReactNode }) => {
    return <SectionContentPreviewProvider>{children}</SectionContentPreviewProvider>
}

export default Layout
