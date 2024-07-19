"use client"
import { ReactNode, Suspense, useContext } from "react"
import { AdminProvider } from "./_hooks"
import { RootContext } from "../_hooks"


const Layout = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data : profile } = profileSwr
    // const { roles } = { ...profile }

    // useAuthorization([AccountRole.Administrator], roles)

    return (
        <Suspense>
            <AdminProvider>{children}</AdminProvider>
        </Suspense>
    )
}

export default Layout
