"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    GetAdminAnalyticsOutputData,
    getAdminAnalytics,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    AnalyticsPanelAction,
    AnalyticsPanelState,
    useAnalyticsPanelReducer,
} from "./useAnalyticsPanelReducer"

export interface AnalyticsPanelContextValue {
  reducer: [
    AnalyticsPanelState,
    React.Dispatch<AnalyticsPanelAction>
  ];
  swrs: {
    analyticsSwr: SWRResponse<GetAdminAnalyticsOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 10

export const AnalyticsPanelContext =
  createContext<AnalyticsPanelContextValue | null>(null)

const WrappedAnalyticsPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useAnalyticsPanelReducer()

    const fetchAnalytics = useCallback(
        async () => {
            const result = await getAdminAnalytics(
                {
                    numberOfAccounts: true,
                    numberOfCourses: true, 
                    numberOfOrders: true,
                    numberOfTransactions: true,
                    enrolledInfos: {
                        enrolledInfoId: true,
                        priceAtEnrolled: true,
                        createdAt: true,
                    }
                }
            )
            return result
        },
        []
    )

    const analyticsSwr = useSWR(
        ["Admin Analytics"],
        fetchAnalytics
    )
    const manageAnalyticsPanelContextValue: AnalyticsPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                analyticsSwr,
            },
        }),
        [reducer, analyticsSwr]
    )

    return (
        <AnalyticsPanelContext.Provider
            value={manageAnalyticsPanelContextValue}
        >
            {children}
        </AnalyticsPanelContext.Provider>
    )
}

export const AnalyticsPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedAnalyticsPanelProvider>
            {children}
        </WrappedAnalyticsPanelProvider>
    </SWRConfig>
)
