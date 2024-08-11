"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyAccountsOutputData,
    findManyAccounts,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    AccountsManagementPanelAction,
    AccountsManagementPanelState,
    useAccountsManagementPanelReducer,
} from "./useAccountsManagementPanelReducer"

export interface AccountsManagementPanelContextValue {
  reducer: [
    AccountsManagementPanelState,
    React.Dispatch<AccountsManagementPanelAction>
  ];
  swrs: {
    accountsSwr: SWRResponse<FindManyAccountsOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 10

export const AccountsManagementPanelContext =
  createContext<AccountsManagementPanelContextValue | null>(null)

const WrappedAccountsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useAccountsManagementPanelReducer()

    const fetchAccounts = useCallback(
        async ([key]: [number, string]) => {
            return await findManyAccounts(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        accountId: true,
                        avatarId: true,
                        avatarUrl: true,
                        kind: true,
                        username: true,
                        birthdate: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                        isDisabled: true
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

    const accountsSwr = useSWR(
        [page, "Accounts"],
        fetchAccounts,
        {
            keepPreviousData: true,
        }
    )

    const manageAccountsPanelContextValue: AccountsManagementPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                accountsSwr,
            },
        }),
        [reducer, accountsSwr]
    )

    return (
        <AccountsManagementPanelContext.Provider
            value={manageAccountsPanelContextValue}
        >
            {children}
        </AccountsManagementPanelContext.Provider>
    )
}

export const AccountsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedAccountsManagementPanelProvider>
            {children}
        </WrappedAccountsManagementPanelProvider>
    </SWRConfig>
)
