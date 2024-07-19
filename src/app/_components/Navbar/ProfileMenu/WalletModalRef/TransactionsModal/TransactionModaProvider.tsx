"use client"
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from "react"

import {
    FindManyTransactionsOutputData,
    findManyTransactions,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    TransactionsModalAction,
    TransactionsModalState,
    useTransactionsModalReducer,
} from "./useTransactionsModalReducer"
import { WalletModalRefContext } from "../WalletModalRefProvider"

export interface TransactionsModalContextValue {
  reducer: [
    TransactionsModalState,
    React.Dispatch<TransactionsModalAction>
  ];
  swrs: {
    transactionsSwr: SWRResponse<FindManyTransactionsOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 5

export const TransactionsModalContext =
  createContext<TransactionsModalContextValue | null>(null)

const WrappedTransactionsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useTransactionsModalReducer()

    const fetchTransactions = useCallback(
        async ([key]: [number, string]) => {
            return await findManyTransactions(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        amountDepositedChange: true,
                        amountOnChainChange: true,
                        payPalOrderId:true,
                        createdAt: true,
                        transactionHash: true,
                        transactionId: true,
                        type: true
                    },
                    metadata: {
                        count: true
                    }   
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const { reducer: walletReducer } = useContext(WalletModalRefContext)!
    const [walletState] = walletReducer

    const transactionsSwr = useSWR(
        [page, walletState.refreshTransactionsKey, "TRANSACTIONS"],
        fetchTransactions,
        {
            keepPreviousData: true,
        }
    )

    const transactionModalContextValue: TransactionsModalContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                transactionsSwr,
            },
        }),
        [reducer, transactionsSwr]
    )

    return (
        <TransactionsModalContext.Provider
            value={transactionModalContextValue}
        >
            {children}
        </TransactionsModalContext.Provider>
    )
}

export const TransactionsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedTransactionsModalProvider>
            {children}
        </WrappedTransactionsModalProvider>
    </SWRConfig>
)
