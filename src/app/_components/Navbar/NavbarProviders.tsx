import { ReactNode, createContext, useState } from "react"

interface INavbarContextValue {
    isSignUpState: {
        isSignUp: boolean,
        setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
    },
    isAuthModalOpenState: {
        isAuthModalOpen: boolean,
        setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export const NavbarContext = createContext<INavbarContextValue | null>(null)

export const NavbarProviders = ({ children }: { children: ReactNode }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    return (
        <NavbarContext.Provider value={{
            isSignUpState: {
                isSignUp,
                setIsSignUp
            },
            isAuthModalOpenState: {
                isAuthModalOpen,
                setIsAuthModalOpen
            }
        }}> {children}
        </NavbarContext.Provider>
    )
}