"use client"
import { ReactNode, createContext, useMemo } from "react"
import React from "react"
import { WalletModalRefAction, WalletModalRefState, useWalletModalRefReducer } from "./useWalletModalRefReducer"

interface WalletModalRefContextValue {
  reducer: [WalletModalRefState, React.Dispatch<WalletModalRefAction>];
}

export const WalletModalRefContext = createContext<WalletModalRefContextValue | null>(null)

export const WalletModalRefProvider = (props: { children: ReactNode }) => {

    const reducer = useWalletModalRefReducer()

    const WalletModalRefContextValue: WalletModalRefContextValue = useMemo(() => ({
        reducer
    }), [reducer])

    return (
        <WalletModalRefContext.Provider
            value={WalletModalRefContextValue}
        >
            {props.children}
        </WalletModalRefContext.Provider>
    )
}
