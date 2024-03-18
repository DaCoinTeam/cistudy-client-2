"use client"
import { Open_Sans } from "next/font/google"
import "./_css/globals.css"
import { ReduxProviders, RootState } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProviders } from "./_hooks"
import { Navbar } from "./_components"
import { ReactNode } from "react"
import { MetaMaskProvider } from "@metamask/sdk-react"
import { useSelector } from "react-redux"
import { NotConnectWalletModal } from "./_components/NotConnectWalletModal"
const font = Open_Sans({ subsets: ["latin"] })

const WrappedLayout = ({ children }: { children: ReactNode }) => {
    const darkMode = useSelector((state: RootState) => state.configuration.darkMode)
    return (
        <html lang="en" className={darkMode ? "dark" : "light"}>
            <body className={`${font.className} min-h-screen`}>
                <MetaMaskProvider
                    debug={false}
                    sdkOptions={{
                        dappMetadata: {
                            name: "Example React Dapp",
                        },
                    }}
                >
                    <NextUIProvider className="min-h-screen flex flex-col">
                        <RootProviders>
                            <Navbar />
                            {children}
                            
                            <NotConnectWalletModal/>
                        </RootProviders>
                    </NextUIProvider>
                </MetaMaskProvider>
            </body>
        </html>
    )
}

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProviders>
            <WrappedLayout>
                {children}
            </WrappedLayout>
        </ReduxProviders>
    )
}

export default Layout
