"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyTransactionOutput,
    findManyTransactions
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    TransactionsManagementPanelAction,
    TransactionsManagementPanelState,
    useTransactionsManagementPanelReducer,
} from "./useTransactionsManagementPanelReducer"

export interface TransactionsManagementPanelContextValue {
  reducer: [
    TransactionsManagementPanelState,
    React.Dispatch<TransactionsManagementPanelAction>
  ];
  swrs: {
    transactionsSwr: SWRResponse<FindManyTransactionOutput, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 5

export const TransactionsManagementPanelContext =
  createContext<TransactionsManagementPanelContextValue | null>(null)

const WrappedTransactionsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useTransactionsManagementPanelReducer()

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
                        transactionHash: true,
                        createdAt: true,
                        from: true,
                        to: true
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

    const transactionsSwr = useSWR(
        [page, "TRANSACTIONS"],
        fetchTransactions,
        {
            keepPreviousData: true,
        }
    )

    const manageTransactionsPanelContextValue: TransactionsManagementPanelContextValue =
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
        <TransactionsManagementPanelContext.Provider
            value={manageTransactionsPanelContextValue}
        >
            {children}
        </TransactionsManagementPanelContext.Provider>
    )
}

export const TransactionsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedTransactionsManagementPanelProvider>
            {children}
        </WrappedTransactionsManagementPanelProvider>
    </SWRConfig>
)
