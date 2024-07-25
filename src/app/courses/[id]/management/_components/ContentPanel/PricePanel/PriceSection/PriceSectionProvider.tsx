"use client"
import React, {
    ReactNode,
    createContext,
    useMemo,
} from "react"
import { PriceSectionAction, PriceSectionState, usePriceSectionReducer } from "./useEarningSectionReducer"


export interface PriceSectionContextValue {
  reducer: [PriceSectionState, React.Dispatch<PriceSectionAction>];
}

export const PriceSectionContext =
  createContext<PriceSectionContextValue | null>(null)

const WrappedPriceSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = usePriceSectionReducer()

    const manageContextValue: PriceSectionContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <PriceSectionContext.Provider value={manageContextValue}>
            {children}
        </PriceSectionContext.Provider>
    )
}

export const PriceSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <WrappedPriceSectionProvider>
        {children}
    </WrappedPriceSectionProvider>
)
