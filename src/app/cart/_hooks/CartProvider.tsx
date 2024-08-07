"use client"
import React, {
    ReactNode,
    createContext,
    useMemo
} from "react"

import { SWRConfig } from "swr"
import {
    CartAction,
    CartState,
    useCartReducer,
} from "./useCartReducer"

export interface CartContextValue {
  reducer: [CartState, React.Dispatch<CartAction>];
}

export const CartContext =
  createContext<CartContextValue | null>(null)

export const WrappedCartProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useCartReducer()

    const cartContextValue: CartContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )
}

export const CartProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCartProvider>{children}</WrappedCartProvider>
    </SWRConfig>
)
