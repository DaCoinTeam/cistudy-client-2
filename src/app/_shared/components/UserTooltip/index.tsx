import { Button, Spacer, Tooltip, User } from "@nextui-org/react"
import { findOneAccount, getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"
import React, { ReactNode, useCallback, useContext } from "react"
import useSWR from "swr"
import { RootContext } from "../../../_hooks"

export interface UserTooltipProps {
    className?: string,
    children: ReactNode,
    accountId: string
}

export const UserTooltip = ({className, children, accountId}: UserTooltipProps) => {
    const router = useRouter()
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
                    followerId: profile?.accountId
                }
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
                kind: true,
            }
        )
    }, [profile])

    const { data, isValidating } = useSWR([accountId, "ACCOUNT"], fetchAccount)
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = { ...data }

    return (
        <Tooltip classNames={{
            content: "p-0"
        }} className={className} content={
            <div className="p-4">
                {
                    isValidating ? <></> : (
                        <div>
                            <User avatarProps={
                                {   
                                    size: "lg",
                                    src: getAvatarUrl({
                                        avatarId,
                                        avatarUrl,
                                        kind,
                                    })
                                }
                            } classNames={{
                                name: "text-base font-semibold"
                            }} name={username} description={`${numberOfFollowers} followers`}/>
                            <Spacer y={6}/>
                            <Button color="primary" fullWidth onPress={() => router.push(`/accounts/${accountId}`)}>View Details</Button>
                        </div>
                    )
                }
            </div>
        }>
            {children}
        </Tooltip>
    )
}