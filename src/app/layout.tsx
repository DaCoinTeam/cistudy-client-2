"use client"
import { Open_Sans } from "next/font/google"
import "./_css/globals.css"
import { ReduxProviders } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProviders } from "./_hooks"
import { Navbar } from "./_components"
import { ReactNode } from "react"
import { MetaMaskProvider } from "@metamask/sdk-react"
const font = Open_Sans({ subsets: ["latin"] })

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProviders>
            <html lang="en">
                <body className={`${font.className} min-h-screen`}>
                    <MetaMaskProvider
                        debug={false}
                        sdkOptions={{
                            dappMetadata: {
                                name: "Example React Dapp",
                                url: window.location.href,
                            },
                        }}
                    >
                        <NextUIProvider className="min-h-screen flex flex-col">
                            <RootProviders>
                                <Navbar />
                                {children}
                            </RootProviders>
                        </NextUIProvider>
                    </MetaMaskProvider>
                </body>
            </html>
        </ReduxProviders>
    )
}

export default Layout
