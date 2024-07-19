"use client"
import { ReactNode } from "react"
import { AccountDetailsProvider } from "./_hooks"
const Layout = ({ children }: { children: ReactNode }) => {
    return <AccountDetailsProvider>{children}</AccountDetailsProvider>
}

export default Layout
