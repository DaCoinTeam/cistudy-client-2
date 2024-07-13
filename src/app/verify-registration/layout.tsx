import { ReactNode, Suspense } from "react"
import { VerifyRegistrationProvider } from "./_hooks"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense>
            <VerifyRegistrationProvider>
                {children}
            </VerifyRegistrationProvider>
        </Suspense>
        
    )
}

export default Layout
