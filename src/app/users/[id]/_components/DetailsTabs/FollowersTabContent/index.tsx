import { Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    FollowersTabContentContext,
    FollowersTabContentProviders,
} from "./FollowersTabContentProviders"
import { FollowerCard } from "./FollowerCard"

const WrappedFollowersTabContent = () => {
    const { state } = useContext(FollowersTabContentContext)!
    const { followers } = state

    const renderFollowers = () => (
        <div className="grid grid-cols-3 gap-6">
            {followers.map((follower) => (
                <FollowerCard key={follower.userId} follower={follower} />
            ))}
        </div>
    )

    return (
        <Card shadow="none" className="border border-divider">
            <CardBody className="p-6">{renderFollowers()}</CardBody>
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
