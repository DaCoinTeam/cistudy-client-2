"use client"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ReduxProviders } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProviders } from "./_hooks"
const font = Open_Sans({ subsets: ["latin"] })

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ReduxProviders>
            <html lang="en">
                <body className={font.className}>
                    <NextUIProvider>
                        <RootProviders>
                            {children}
                        </RootProviders>
                    </NextUIProvider>
                </body>
            </html>
        </ReduxProviders>
    )
}

export default RootLayout