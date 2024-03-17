"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import { findOneUser } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, UserEntity } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { RootContext } from "../../../_hooks"

export interface UserDetailsContextValue {
  swrs: {
    userSwr: SWRResponse<UserEntity, ErrorResponse>;
  };
}

export const UserDetailsContext = createContext<UserDetailsContextValue | null>(
    null
)

const WrappedUserDetailsProviders = ({ children }: { children: ReactNode }) => {
    const params = useParams()
    const userId = params.id as string

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const fetchUser = useCallback(async () => {
        return await findOneUser(
            {
                params: {
                    userId
                },
                options: {
                    followerId: profile?.userId,
                },
            },
            {
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                coverPhotoId: true,
                followed: true,
                numberOfFollowers: true,
                avatarUrl: true,
                kind: true
            }
        )
    }, [profile])

    const userSwr = useSWR([profile?.userId, "USER"], fetchUser)

    const userDetailsContextValue: UserDetailsContextValue = useMemo(
        () => ({
            swrs: {
                userSwr,
            },
        }),
        [userSwr]
    )

    return (
        <UserDetailsContext.Provider value={userDetailsContextValue}>
            {children}
        </UserDetailsContext.Provider>
    )
}

export const UserDetailsProviders = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedUserDetailsProviders>{children}</WrappedUserDetailsProviders>
    </SWRConfig>
)
