import React, { useContext } from "react"
import { PostEntity } from "@common"
import { Avatar } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { FooterContentContext } from "../index"

interface CreatorAndStatsProps {
  post: PostEntity;
}

export const CreatorAndStats = (props: CreatorAndStatsProps) => {
    const { state } = useContext(FooterContentContext)!
    const { postPartial } = state

    const renderNumberOfLikes = () =>
        `${
            postPartial?.postReacts.filter((postReact) => postReact.liked).length
        } `
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar isBordered src={getAssetUrl(props.post.creator.avatarId)} />
                <div>
                    <div className="font-bold text-sm"> StarCi</div>
                    <div className="text-xs"> Yesterday at 11:30</div>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="text-sm">
                    <span className="font-bold">{renderNumberOfLikes()}</span>
                    <span>likes</span>
                </div>
                <div className="text-sm">
                    <span className="font-bold"> {`${234}`} </span> <span>comments</span>
                </div>
            </div>
        </div>
    )
}
