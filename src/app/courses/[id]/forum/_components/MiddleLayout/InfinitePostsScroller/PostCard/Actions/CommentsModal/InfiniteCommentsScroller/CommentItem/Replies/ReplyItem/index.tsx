import { User } from "@nextui-org/react"
import React from "react"
import { PostCommentReplyEntity, parseTimeAgo } from "@common"
import { getAssetUrl } from "@services"

interface ReplyItemProps {
  postCommentReply: PostCommentReplyEntity;
}

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, content, createdAt } = postCommentReply
    const { avatarId, username } = creator

    return (
        <User
            className="justify-normal"
            name={content}
            description={
                <div className="flex gap-2 items-center">
                    <div className="font-semibold"> {username} </div>
                    •
                    <div> {parseTimeAgo(createdAt)} </div>
                </div>
            }
            avatarProps={{ src: getAssetUrl(avatarId), size: "sm" }}
        />
    )
}
