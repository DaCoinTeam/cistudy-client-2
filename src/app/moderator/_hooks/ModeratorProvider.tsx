"use client"
import React, {
    ReactNode,
    createContext,
    useEffect,
    useMemo,
} from "react"

import {
    ModeratorAction,
    ModeratorState,
    PanelSelected,
    useModeratorReducer,
} from "./useModeratorReducer"

import { useSearchParams } from "next/navigation"

export interface ModeratorContextValue {
  reducer: [ModeratorState, React.Dispatch<ModeratorAction>];
}

export const ModeratorContext = createContext<ModeratorContextValue | null>(
    null
)

const WrappedModeratorProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useModeratorReducer()
    const [, dispatch] = reducer

    const searchParams = useSearchParams()

    const tab = (searchParams.get("tab") ??
    PanelSelected.CoursesApproval) as PanelSelected

    useEffect(() => {
        dispatch({
            type: "SET_PANEL_SELECTED",
            payload: tab,
        })
    }, [])

    const manageContextValue: ModeratorContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <ModeratorContext.Provider value={manageContextValue}>
            {children}
        </ModeratorContext.Provider>
    )
}

export const ModeratorProvider = ({ children }: { children: ReactNode }) => (
    <WrappedModeratorProvider>{children}</WrappedModeratorProvider>
)
