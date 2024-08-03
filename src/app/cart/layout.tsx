"use client"
import { ReactNode, Suspense } from "react"
import { CartProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <CartProvider>
                {children}
            </CartProvider>
        </Suspense>
    )
}

export default Layout
