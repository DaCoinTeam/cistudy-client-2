"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyUsersOutputData,
    findManyUsers,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    UsersManagementPanelAction,
    UsersManagementPanelState,
    useUsersManagementPanelReducer,
} from "./useUsersManagementPanelReducer"

export interface UsersManagementPanelContextValue {
  reducer: [
    UsersManagementPanelState,
    React.Dispatch<UsersManagementPanelAction>
  ];
  swrs: {
    usersSwr: SWRResponse<FindManyUsersOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 5

export const UsersManagementPanelContext =
  createContext<UsersManagementPanelContextValue | null>(null)

const WrappedUsersManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useUsersManagementPanelReducer()

    const fetchUsers = useCallback(
        async ([key]: [number, string]) => {
            return await findManyUsers(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        userId: true,
                        avatarId: true,
                        avatarUrl: true,
                        kind: true,
                        username: true,
                        birthdate: true,
                        email: true
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

    const usersSwr = useSWR(
        [page, "Users"],
        fetchUsers,
        {
            keepPreviousData: true,
        }
    )

    const manageUsersPanelContextValue: UsersManagementPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                usersSwr,
            },
        }),
        [reducer, usersSwr]
    )

    return (
        <UsersManagementPanelContext.Provider
            value={manageUsersPanelContextValue}
        >
            {children}
        </UsersManagementPanelContext.Provider>
    )
}

export const UsersManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedUsersManagementPanelProvider>
            {children}
        </WrappedUsersManagementPanelProvider>
    </SWRConfig>
)
