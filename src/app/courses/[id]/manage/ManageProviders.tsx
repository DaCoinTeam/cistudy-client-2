"use client"
import React, {
    ReactNode,
    createContext,
    useMemo,
} from "react"

import {
    ManageAction,
    ManageState,
    useManageReducer,
} from "./useManageReducer"

export interface ManageContextValue {
  state: ManageState;
  dispatch: React.Dispatch<ManageAction>;
}

export const ManageContext =
  createContext<ManageContextValue | null>(null)

export const ManageProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useManageReducer()

    const manageContextValue: ManageContextValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    )

    return (
        <ManageContext.Provider value={manageContextValue}>
            {children}
        </ManageContext.Provider>
    )
}
