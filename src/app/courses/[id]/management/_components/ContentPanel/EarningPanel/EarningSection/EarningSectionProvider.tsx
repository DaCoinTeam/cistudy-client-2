"use client"
import React, {
    ReactNode,
    createContext,
    useMemo,
} from "react"

import {
    EarningSectionAction,
    EarningSectionState,
    useEarningSectionReducer,
} from "./useEarningSectionReducer"

export interface EarningSectionContextValue {
  reducer: [EarningSectionState, React.Dispatch<EarningSectionAction>];
}

export const EarningSectionContext =
  createContext<EarningSectionContextValue | null>(null)

const WrappedEarningSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useEarningSectionReducer()

    const manageContextValue: EarningSectionContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <EarningSectionContext.Provider value={manageContextValue}>
            {children}
        </EarningSectionContext.Provider>
    )
}

export const EarningSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <WrappedEarningSectionProvider>
        {children}
    </WrappedEarningSectionProvider>
)
