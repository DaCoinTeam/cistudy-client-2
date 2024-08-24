"use client"
import { Inter } from "next/font/google"
import "./_css/globals.css"
import { ReduxProvider, RootState } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProvider, SocketIOProvider } from "./_hooks"
import { Footer, Navbar } from "./_components"
import { ReactNode, useEffect } from "react"
import { MetaMaskProvider } from "@metamask/sdk-react"
import { useSelector } from "react-redux"
import { NotConnectWalletModal } from "./_components/NotConnectWalletModal"
import { pageView } from "./google-analytics"
import { usePathname } from "next/navigation"
const font = Inter({ subsets: ["latin"] })
import { GoogleAnalytics } from "@next/third-parties/google"

const GA_ID = "G-M0WSRMVZLX"

const WrappedLayout = ({ children }: { children: ReactNode }) => {
    const darkMode = useSelector(
        (state: RootState) => state.configuration.darkMode
    )

    return (
        <html lang="en" className={darkMode ? "dark" : "light"}>
            <body className={`${font.className} min-h-screen`}>
                <GoogleAnalytics gaId={GA_ID} />
                <NextUIProvider className="min-h-screen flex flex-col">
                    <RootProvider>
                        <SocketIOProvider>
                            <MetaMaskProvider
                                sdkOptions={{
                                    extensionOnly: true,
                                    dappMetadata: {
                                        name: "CiStudy",
                                    },
                                }}
                            >
                                <Navbar />
                                <div className="min-h-[56vh]">
                                    {children}
                                </div>
                                <Footer />
                                <NotConnectWalletModal />
                            </MetaMaskProvider>
                        </SocketIOProvider>
                    </RootProvider>
                </NextUIProvider>
            </body>
        </html>
    )
}

const Layout = ({ children }: { children: ReactNode }) => {

    const pathname = usePathname()
    useEffect(() => {
        const handleRouteChange = () => {
            pageView(pathname)
        }
        handleRouteChange()
    }, [pathname])

    return (
        <ReduxProvider>
            <WrappedLayout>{children}</WrappedLayout>
        </ReduxProvider>
    )
}

export default Layout
