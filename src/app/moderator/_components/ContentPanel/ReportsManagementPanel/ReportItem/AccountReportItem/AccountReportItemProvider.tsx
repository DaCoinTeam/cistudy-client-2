"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    findManyAccountReports,
    FindManyAccountReportsOutputData
} from "@services"

import { ErrorResponse } from "@common"
import { AccountReportManagementPanelAction, AccountReportManagementPanelState, useAccountReportManagementPanelReducer } from "./useAccountReportItemReducer"
import useSWR, { SWRResponse } from "swr"

export interface AccountReportItemContextValue {
    reducer: [AccountReportManagementPanelState, React.Dispatch<AccountReportManagementPanelAction>],
    swrs: {
        accountReportsSwr: SWRResponse<FindManyAccountReportsOutputData | undefined, ErrorResponse>
    },
}

export const ROWS_PER_PAGE = 5

export const AccountReportItemContext = createContext<AccountReportItemContextValue | null>(null)

const WrappedAccountReportItem = ({ children }: { 
    children: ReactNode 
}) => {
    const reducer = useAccountReportManagementPanelReducer()

    const fetchAccountReports = useCallback(
        async ([key]: [number, string]) => {
            return await findManyAccountReports(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        reportAccountId: true,
                        reportedAccountId: true,
                        reporterAccountId: true,
                        description: true,
                        processNote: true,
                        processStatus: true,
                        reportedAccount: {
                            accountId: true,
                            avatarUrl: true,
                            username: true,
                            email: true,
                        },
                        reporterAccount: {
                            accountId: true,
                            avatarUrl: true,
                            username: true,
                            email: true,
                        },
                        createdAt: true,
                        updatedAt: true,
                    },
                    metadata: {
                        count: true,
                    },
                }
            )
        },
        []
    )

    const [state] = reducer
    const {page} = state

    const accountReportsSwr = useSWR<FindManyAccountReportsOutputData | undefined, ErrorResponse>(
        [page, "ACCOUNT_REPORTS"],
        fetchAccountReports,
        {
            revalidateOnFocus: true,
        }
    )

    const accountReportItemContextValue: AccountReportItemContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                accountReportsSwr
            }
        }),
        [reducer, accountReportsSwr]
    )

    return (
        <AccountReportItemContext.Provider value={accountReportItemContextValue}>
            {children}
        </AccountReportItemContext.Provider>
    )
}

export const AccountReportItemProvider = ({ children }: { children: ReactNode }) => {

    return (
        <WrappedAccountReportItem>{children}</WrappedAccountReportItem>
    )
}