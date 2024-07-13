import { ReactNode } from "react"
import { VerifyRegistrationProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <VerifyRegistrationProvider>
            {children}
        </VerifyRegistrationProvider>
    )
}

export default Layout
