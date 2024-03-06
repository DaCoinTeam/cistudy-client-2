import React, { useContext } from "react"
import { User } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { PostCardContext } from ".."
import { calculateTimeAgo } from "@common"

interface CreatorAndStatsProps {
  className?: string;
}

export const CreatorAndStats = (props: CreatorAndStatsProps) => {
    const { className } = props

    const { props: postCardProps } = useContext(PostCardContext)!
    const { post } = postCardProps
    const { numberOfLikes, numberOfComments, creator, updatedAt } = post
    const { avatarId, username } = creator

    return (
        <div className={`flex items-center justify-between ${className ?? ""}`}>
            <User
                name={username}
                classNames={{
                    name: "font-semibold text-base",
                    base: "gap-3"
                }}
                description={calculateTimeAgo(updatedAt)}
                avatarProps={{ src: getAssetUrl(avatarId), size: "lg" }}
            />
            <div className="flex gap-4">
                <div className="text-sm">{numberOfLikes} likes</div>
                <div className="text-sm">{numberOfComments} comments</div>
            </div>
        </div>
    )
}
