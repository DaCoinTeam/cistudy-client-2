import { ReactNode, createContext, useMemo } from "react"
import {
    NavbarAction,
    NavbarState,
    useNavbarReducer,
} from "./useNavbarReducer"

export interface NavbarContextValue {
  state: NavbarState;
  dispatch: React.Dispatch<NavbarAction>;
}

export const NavbarContext = createContext<NavbarContextValue | null>(null)

export const NavbarProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useNavbarReducer()

    const navbarContextValue: NavbarContextValue = useMemo(() => ({
        state,
        dispatch,
    }), [state, dispatch])
    return (
        <NavbarContext.Provider value={navbarContextValue}>
            {children}
        </NavbarContext.Provider>
    )
}
