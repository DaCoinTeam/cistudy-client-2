"use client"
import React, {
    ReactNode,
    createContext,
    useEffect,
    useMemo,
} from "react"

import {
    ManagementAction,
    ManagementState,
    PanelSelected,
    useManagementReducer,
} from "./useManagementReducer"

import { useSearchParams } from "next/navigation"

export interface ManagementContextValue {
  reducer: [ManagementState, React.Dispatch<ManagementAction>];
}

export const ManagementContext = createContext<ManagementContextValue | null>(
    null
)

const WrappedManagementProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useManagementReducer()
    const [, dispatch] = reducer

    const searchParams = useSearchParams()

    const tab = (searchParams.get("tab") ??
    PanelSelected.Courses) as PanelSelected

    useEffect(() => {
        dispatch({
            type: "SET_PANEL_SELECTED",
            payload: tab,
        })
    }, [])

    const manageContextValue: ManagementContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <ManagementContext.Provider value={manageContextValue}>
            {children}
        </ManagementContext.Provider>
    )
}

export const ManagementProvider = ({ children }: { children: ReactNode }) => (
    <WrappedManagementProvider>{children}</WrappedManagementProvider>
)
