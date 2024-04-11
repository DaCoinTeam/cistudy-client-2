"use client"
import { Open_Sans } from "next/font/google"
import "./_css/globals.css"
import { ReduxProvider, RootState } from "@redux"
import { NextUIProvider } from "@nextui-org/react"
import { RootProvider } from "./_hooks"
import { Navbar } from "./_components"
import { ReactNode, useEffect } from "react"
import { MetaMaskProvider } from "@metamask/sdk-react"
import { useSelector } from "react-redux"
import { NotConnectWalletModal } from "./_components/NotConnectWalletModal"
const font = Open_Sans({ subsets: ["latin"] })
import { useRouter } from "next/router"
import { pageView } from "./google-analytics"

const WrappedLayout = ({ children }: { children: ReactNode }) => {
    const darkMode = useSelector(
        (state: RootState) => state.configuration.darkMode
    )

    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageView(url)
        }

        router.events.on("routeChangeComplete", handleRouteChange)

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events])

    return (
        <html lang="en" className={darkMode ? "dark" : "light"}>
            <body className={`${font.className} min-h-screen`}>
                <NextUIProvider className="min-h-screen flex flex-col">
                    <RootProvider>
                        <MetaMaskProvider
                            sdkOptions={{
                                extensionOnly: true,
                                dappMetadata: {
                                    name: "CiStudy",
                                },
                            }}
                        >
                            <Navbar />
                            {children}
                            <NotConnectWalletModal />
                        </MetaMaskProvider>
                    </RootProvider>
                </NextUIProvider>
            </body>
        </html>
    )
}

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider>
            <WrappedLayout>{children}</WrappedLayout>
        </ReduxProvider>
    )
}

export default Layout
