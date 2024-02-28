import React from "react"
import { UserEntity } from "@common"
import { Card, CardBody, User } from "@nextui-org/react"
import { getAssetUrl } from "@services"

interface FollowerCardProps {
  follower: UserEntity;
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
                        base: "gap-3",
                        name: "text-base font-semibold",
                    }}
                    name={username}
                    description="Product Designer"
                    avatarProps={{
                        src: getAssetUrl(avatarId),
                        className: "w-16 h-16",
                    }}
                ></User>
            </CardBody>
        </Card>
    )
}
