import React, { useContext } from "react"
import { Avatar } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { PostCardContext } from ".."
import { calculateTimeAgo } from "@common"

interface CreatorAndStatsProps {
    className?: string
}

export const CreatorAndStats = (props: CreatorAndStatsProps) => {
    const { className } = props

    const { props : postCardProps } = useContext(PostCardContext)!
    const { post } = postCardProps
    const { numberOfLikes, numberOfComments, creator, updatedAt } = post
    const { avatarId, username } = creator

    return (
        <div className={`flex items-center justify-between ${className ?? ""}`}>
            <div className="flex items-center gap-3">
                <Avatar src={getAssetUrl(avatarId)} />
                <div>
                    <div className="font-semibold text-sm"> {username} </div>
                    <div className="text-xs"> { calculateTimeAgo(updatedAt)} </div>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="text-sm">
                    <span className="font-semibold">{numberOfLikes} </span>
                    <span>likes</span>
                </div>
                <div className="text-sm">
                    <span className="font-semibold"> {numberOfComments} </span> <span>comments</span>
                </div>
            </div>
        </div>
    )
}
