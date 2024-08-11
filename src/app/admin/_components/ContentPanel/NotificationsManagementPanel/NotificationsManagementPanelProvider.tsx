"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyNotificationsOutputData,
    findManyNotifications,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    NotificationsManagementPanelAction,
    NotificationsManagementPanelState,
    useNotificationsManagementPanelReducer,
} from "./useNotificationsManagementPanelReducer"

export interface NotificationsManagementPanelContextValue {
  reducer: [
    NotificationsManagementPanelState,
    React.Dispatch<NotificationsManagementPanelAction>
  ];
  swrs: {
    notificationsSwr: SWRResponse<FindManyNotificationsOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 10

export const NotificationsManagementPanelContext =
  createContext<NotificationsManagementPanelContextValue | null>(null)

const WrappedNotificationsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useNotificationsManagementPanelReducer()

    const fetchNotifications = useCallback(
        async ([key]: [number, string]) => {
            return await findManyNotifications(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        notificationId: true,
                        title: true,
                        description: true,
                        createdAt: true,
                        viewed: true,
                        receiver: {
                            accountId: true,
                            avatarId: true,
                            avatarUrl: true,
                            kind: true,
                            username: true
                        }
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

    const notificationsSwr = useSWR(
        [page, "Notifications"],
        fetchNotifications,
        {
            keepPreviousData: true,
        }
    )

    const manageNotificationsPanelContextValue: NotificationsManagementPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                notificationsSwr,
            },
        }),
        [reducer, notificationsSwr]
    )

    return (
        <NotificationsManagementPanelContext.Provider
            value={manageNotificationsPanelContextValue}
        >
            {children}
        </NotificationsManagementPanelContext.Provider>
    )
}

export const NotificationsManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedNotificationsManagementPanelProvider>
            {children}
        </WrappedNotificationsManagementPanelProvider>
    </SWRConfig>
)
