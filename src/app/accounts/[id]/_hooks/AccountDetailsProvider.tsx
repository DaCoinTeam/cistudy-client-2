"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import { findOneAccount } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, AccountEntity } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { RootContext } from "../../../_hooks"

export interface AccountDetailsContextValue {
  swrs: {
    accountSwr: SWRResponse<AccountEntity, ErrorResponse>;
  };
}

export const AccountDetailsContext = createContext<AccountDetailsContextValue | null>(
    null
)

const WrappedAccountDetailsProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams()
    const accountId = params.id as string

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const fetchAccount = useCallback(async () => {
        return await findOneAccount(
            {
                params: {
                    accountId
                },
                options: {
                    followerId: profile?.accountId,
                },
            },
            {
                accountId: true,
                username: true,
                email: true,
                avatarId: true,
                birthdate: true,
                coverPhotoId: true,
                followed: true,
                numberOfFollowers: true,
                avatarUrl: true,
                kind: true
            }
        )
    }, [profile])

    const accountSwr = useSWR([profile?.accountId, "ACCOUNT"], fetchAccount)

    const accountDetailsContextValue: AccountDetailsContextValue = useMemo(
        () => ({
            swrs: {
                accountSwr,
            },
        }),
        [accountSwr]
    )

    return (
        <AccountDetailsContext.Provider value={accountDetailsContextValue}>
            {children}
        </AccountDetailsContext.Provider>
    )
}

export const AccountDetailsProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedAccountDetailsProvider>{children}</WrappedAccountDetailsProvider>
    </SWRConfig>
)
