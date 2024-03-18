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

export const WrappedFollowersTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user } = userSwr
    const { userId } = { ...user }

    const fetchFollowers = useCallback(async () => {
        if (!userId) return
        return await findManyFollowers(
            {
                params: {
                    userId,
                }
            },
            {
                userId: true,
                username: true,
                avatarId: true,
                coverPhotoId: true,
            }
        )
    }, [userId])

    const followersSwr = useSWR(userId ? ["FOLLOWERS"] : null, fetchFollowers)

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
