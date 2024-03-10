import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    FollowersTabContentContext,
    FollowersTabContentProviders,
} from "./FollowersTabContentProviders"
import { FollowerCard } from "./FollowerCard"
import { Actions } from "./Actions"

const WrappedFollowersTabContent = () => {
    const { swrs } = useContext(FollowersTabContentContext)!
    const { followersSwr } = swrs
    const { data: followers } = followersSwr

    const renderFollowers = () => (
        <div className="grid grid-cols-3 gap-4">
            {followers?.map((follower) => (
                <FollowerCard key={follower.userId} follower={follower} />
            ))}
        </div>
    )

    return (
        <Card shadow="none" className="border border-divider">
            <CardHeader className="p-4 pb-2  justify-between flex items-center"> 
                <div className="text-lg font-semibold"> Followers </div>
                <Actions />
            </CardHeader>
            <CardBody className="p-4">{renderFollowers()}</CardBody>
        </Card>
    )
}

export const FollowersTabContent = () => {
    return (
        <FollowersTabContentProviders>
            <WrappedFollowersTabContent />
        </FollowersTabContentProviders>
    )
}
