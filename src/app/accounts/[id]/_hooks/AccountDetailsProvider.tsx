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
                bio: true,
                kind: true,
                roles: {
                    accountId: true,
                    name: true,
                    roleId: true,
                },
                accountJobs: {
                    accountJobId: true,
                    companyName: true,
                    companyThumbnailId: true,
                    role: true,
                    startDate: true,
                    endDate: true,
                },
                accountQualifications: {
                    accountQualificationId: true,
                    fileId: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    issuedAt: true,
                    issuedFrom: true,
                    url: true
                },
                instructorStatus: true,
            }
        )
    }, [profile])

    const accountSwr = useSWR([profile, "ACCOUNT"], fetchAccount)

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
