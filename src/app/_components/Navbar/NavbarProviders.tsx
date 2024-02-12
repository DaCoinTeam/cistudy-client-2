import { ReactNode, createContext } from "react"
import {
    NavbarAction,
    NavbarState,
    useNavbarReducer,
} from "./useNavbarReducer"

export interface INavbarContextValue {
  state: NavbarState;
  dispatch: React.Dispatch<NavbarAction>;
}

export const NavbarContext = createContext<INavbarContextValue | null>(null)

export const NavbarProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useNavbarReducer()
    return (
        <NavbarContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}
