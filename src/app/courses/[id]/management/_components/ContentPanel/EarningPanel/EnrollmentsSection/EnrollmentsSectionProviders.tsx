"use client"
import React, {
    ReactNode,
    createContext,
    useMemo,
} from "react"

import {
    EnrollmentsSectionAction,
    EnrollmentsSectionState,
    useEnrollmentsSectionReducer,
} from "./useEnrollmentsSectionReducer"

export interface EnrollmentsSectionContextValue {
  reducer: [EnrollmentsSectionState, React.Dispatch<EnrollmentsSectionAction>];
}

export const EnrollmentsSectionContext =
  createContext<EnrollmentsSectionContextValue | null>(null)

const WrappedEnrollmentsSectionProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useEnrollmentsSectionReducer()

    const manageContextValue: EnrollmentsSectionContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <EnrollmentsSectionContext.Provider value={manageContextValue}>
            {children}
        </EnrollmentsSectionContext.Provider>
    )
}

export const EnrollmentsSectionProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <WrappedEnrollmentsSectionProviders>
        {children}
    </WrappedEnrollmentsSectionProviders>
)
