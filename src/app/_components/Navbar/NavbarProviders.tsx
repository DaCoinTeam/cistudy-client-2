import { ReactNode, createContext, useMemo } from "react"
import {
    NavbarAction,
    INavbarState,
    useNavbarReducer,
} from "./useNavbarReducer"

export interface INavbarContextValue {
  state: INavbarState;
  dispatch: React.Dispatch<NavbarAction>;
}

export const NavbarContext = createContext<INavbarContextValue | null>(null)

export const NavbarProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useNavbarReducer()

    const navbarContextValue: INavbarContextValue = useMemo(() => ({
        state,
        dispatch,
    }), [state, dispatch])
    return (
        <NavbarContext.Provider value={navbarContextValue}>
            {children}
        </NavbarContext.Provider>
    )
}
