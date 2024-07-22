"use client"
import { ReactNode } from "react"
import { ContentDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <ContentDetailsProvider>{children}</ContentDetailsProvider>
}

export default Layout
