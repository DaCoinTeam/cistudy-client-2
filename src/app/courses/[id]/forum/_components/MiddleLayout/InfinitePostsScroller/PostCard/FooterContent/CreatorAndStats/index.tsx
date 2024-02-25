import React, { useContext } from "react"
import { Avatar } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { PostCardContext } from "../../index"

export const CreatorAndStats = () => {
    const { props } = useContext(PostCardContext)!
    const { post } = props

    const renderNumberOfLikes = () =>
        `${
            post?.postReacts.filter((post) => post.liked).length
        } `
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar key={post?.postId} src={getAssetUrl(post?.creator?.avatarId)} />
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
