import { ReactNode, createContext, useMemo } from "react"
import {
    NavbarAction,
    NavbarState,
    useNavbarReducer,
} from "./useNavbarReducer"
import { useDisclosure } from "@nextui-org/react"
import { Disclosure } from "@common"

export interface NavbarContextValue {
  reducer: [NavbarState, React.Dispatch<NavbarAction>];
  disclosures: {
    authModalDisclosure: Disclosure;
  };
}

export const NavbarContext = createContext<NavbarContextValue | null>(null)

export const NavbarProviders = ({ children }: { children: ReactNode }) => {
    const reducer = useNavbarReducer()

    const authModalDisclosure = useDisclosure()

    const navbarContextValue: NavbarContextValue = useMemo(
        () => ({
            reducer,
            disclosures: {
                authModalDisclosure
            },
        }),
        [reducer, authModalDisclosure]
    )
    return (
        <NavbarContext.Provider value={navbarContextValue}>
            {children}
        </NavbarContext.Provider>
    )
}
