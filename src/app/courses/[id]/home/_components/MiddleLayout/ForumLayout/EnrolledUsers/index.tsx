import { Chip, Divider, Spacer, User } from "@nextui-org/react"
import React, { useContext } from "react"
import { HomeContext } from "../../../../_hooks"
import { getAvatarUrl } from "@services"
import { UserTooltip } from "../../../../../../../_shared"

export const EnrolledUsers = () => {
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data } = courseHomeSwr
    
    return (
        <div>
            <div className="cursor-pointer flex justify-between items-center" >
                <User avatarProps={
                    {
                        src: getAvatarUrl({
                            avatarId: data?.creator.avatarId,
                            avatarUrl: data?.creator.avatarUrl,
                            kind: data?.creator.kind,
                        })
                    }
                } name={data?.creator.username}/>
                <Chip variant="flat" color="primary">Instructor</Chip>
            </div>
            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>
            <div className="grid gap-4">
                {
                    (data?.students ?? []).map(({accountId, avatarId, avatarUrl, kind, username}) => (
                        <div key={accountId} className="cursor-pointer">
                            <UserTooltip accountId={accountId}>
                                <User avatarProps={
                                    {
                                        src: getAvatarUrl({
                                            avatarId,
                                            avatarUrl,
                                            kind,
                                        })
                                    }
                                } name={username}/>
                            </UserTooltip>
                        </div>
                    ))
                }
            </div>     
        </div>
    )
}