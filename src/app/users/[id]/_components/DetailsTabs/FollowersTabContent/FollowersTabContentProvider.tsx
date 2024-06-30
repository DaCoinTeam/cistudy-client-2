"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findManyFollowers } from "@services"
import { AccountDetailsContext } from "../../../_hooks"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { ErrorResponse, AccountEntity } from "@common"

export interface FollowersTabContentContextValue {
  swrs: {
    followersSwr: SWRResponse<Array<AccountEntity> | undefined, ErrorResponse>
  }
}

export const FollowersTabContentContext =
  createContext<FollowersTabContentContextValue | null>(null)

export const WrappedFollowersTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account } = accountSwr
    const { accountId } = { ...account }

    const fetchFollowers = useCallback(async () => {
        if (!accountId) return
        return await findManyFollowers(
            {
                params: {
                    accountId,
                }
            },
            {
                accountId: true,
                username: true,
                avatarId: true,
                coverPhotoId: true,
            }
        )
    }, [accountId])

    const followersSwr = useSWR(accountId ? ["FOLLOWERS"] : null, fetchFollowers)

    const followersTabContentContextValue: FollowersTabContentContextValue =
    useMemo(
        () => ({
            swrs: {
                followersSwr
            }
        }),
        [followersSwr]
    )

    return (
        <FollowersTabContentContext.Provider
            value={followersTabContentContextValue}
        >
            {children}
        </FollowersTabContentContext.Provider>
    )
}

export const FollowersTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedFollowersTabContentProvider>
            {children}
        </WrappedFollowersTabContentProvider>
    </SWRConfig>
)
