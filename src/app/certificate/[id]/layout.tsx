"use client"
import { ReactNode } from "react"
import { CertificateProvider } from "./_hooks/CertificateProvider"
const Layout = ({ children }: { children: ReactNode }) => {
    return <CertificateProvider>{children}</CertificateProvider>
}

export default Layout
