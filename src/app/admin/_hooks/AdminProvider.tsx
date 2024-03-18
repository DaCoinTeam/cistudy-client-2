"use client"
import React, {
    ReactNode,
    createContext,
    useEffect,
    useMemo,
} from "react"

import {
    AdminAction,
    AdminState,
    PanelSelected,
    useAdminReducer,
} from "./useAdminReducer"

import { useSearchParams } from "next/navigation"

export interface AdminContextValue {
  reducer: [AdminState, React.Dispatch<AdminAction>];
}

export const AdminContext = createContext<AdminContextValue | null>(
    null
)

const WrappedAdminProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useAdminReducer()
    const [, dispatch] = reducer

    const searchParams = useSearchParams()

    const tab = (searchParams.get("tab") ??
    PanelSelected.Users) as PanelSelected

    useEffect(() => {
        dispatch({
            type: "SET_PANEL_SELECTED",
            payload: tab,
        })
    }, [])

    const manageContextValue: AdminContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <AdminContext.Provider value={manageContextValue}>
            {children}
        </AdminContext.Provider>
    )
}

export const AdminProvider = ({ children }: { children: ReactNode }) => (
    <WrappedAdminProvider>{children}</WrappedAdminProvider>
)
