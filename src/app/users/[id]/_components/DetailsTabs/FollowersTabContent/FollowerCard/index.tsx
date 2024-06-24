import React from "react"
import { AccountEntity } from "@common"
import { Card, CardBody, User } from "@nextui-org/react"
import { getAssetUrl } from "@services"

interface FollowerCardProps {
  follower: AccountEntity;
  className?: string;
}

export const FollowerCard = (props: FollowerCardProps) => {
    const { follower, className } = props
    const { avatarId, username } = follower

    return (
        <Card
            className={`${className ?? ""} border border-divider`}
            shadow="none"
            isPressable
        >
            <CardBody className="p-4">
                <User
                    className="w-fit"
                    classNames={{
                        name: "text-base",
                        base: "gap-3"
                    }}
                    name={username}
                    description="Product Designer"
                    avatarProps={{
                        src: getAssetUrl(avatarId),
                        size: "lg"
                    }}
                ></User>
            </CardBody>
        </Card>
    )
}
