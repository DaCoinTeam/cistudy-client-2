"use client"
import React, { ReactNode, createContext, useMemo } from "react"

import {
    AddContentBoxAction,
    AddContentBoxState,
    useAddContentBoxReducer,
} from "./useAddContentBoxReducer"

export interface AddContentBoxContextValue {
  state: AddContentBoxState;
  dispatch: React.Dispatch<AddContentBoxAction>;
}

export const AddContentBoxContext =
  createContext<AddContentBoxContextValue | null>(null)

export const AddContentBoxsProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useAddContentBoxReducer()

    const AddContentBoxContextValue: AddContentBoxContextValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    )

    return (
        <AddContentBoxContext.Provider value={AddContentBoxContextValue}>
            {children}
        </AddContentBoxContext.Provider>
    )
}
