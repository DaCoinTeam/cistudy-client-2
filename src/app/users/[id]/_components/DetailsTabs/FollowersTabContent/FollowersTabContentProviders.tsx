"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findManyFollowers } from "@services"
import { UserDetailsContext } from "../../../_hooks"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { ErrorResponse, UserEntity } from "@common"

export interface FollowersTabContentContextValue {
  swrs: {
    followersSwr: SWRResponse<Array<UserEntity> | undefined, ErrorResponse>
  }
}

export const FollowersTabContentContext =
  createContext<FollowersTabContentContextValue | null>(null)

export const WrappedFollowersTabContentProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user } = userSwr

    const fetchFollowers = useCallback(async () => {
        if (!user) return
        const { userId } = user

        return await findManyFollowers(
            {
                userId,
            },
            {
                userId: true,
                username: true,
                avatarId: true,
                coverPhotoId: true,
            }
        )
    }, [user?.userId])

    const followersSwr = useSWR(["FETCH_FOLLOWERS"], fetchFollowers)

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

export const FollowersTabContentProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedFollowersTabContentProviders>
            {children}
        </WrappedFollowersTabContentProviders>
    </SWRConfig>
)
