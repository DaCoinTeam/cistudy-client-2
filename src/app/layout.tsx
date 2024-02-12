"use client"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ReduxProviders } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProviders } from "./_hooks"
import { Navbar } from "./_components"
import { ReactNode } from "react"
const font = Open_Sans({ subsets: ["latin"] })

const RootLayout = ({children} : {children: ReactNode}) => {
    return (
        <ReduxProviders>
            <html lang="en">
                <body className={font.className}>
                    <NextUIProvider>
                        <RootProviders>
                            <Navbar/>
                            {children}
                        </RootProviders>
                    </NextUIProvider>
                </body>
            </html>
        </ReduxProviders>
    )
}

export default RootLayout