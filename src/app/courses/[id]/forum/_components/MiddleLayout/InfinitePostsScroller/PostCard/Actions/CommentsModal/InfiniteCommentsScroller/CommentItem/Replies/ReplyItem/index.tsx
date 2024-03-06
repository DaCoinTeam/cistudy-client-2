import { Avatar } from "@nextui-org/react"
import React from "react"
import { PostCommentReplyEntity } from "@common"
import { getAssetUrl } from "@services"

interface ReplyItemProps {
  postCommentReply: PostCommentReplyEntity;
}

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, content } = postCommentReply
    const { avatarId, username } = creator

    return (
        <div className="flex gap-2">
            <Avatar src={getAssetUrl(avatarId)} />
            <div className="flex-1 items-center rounded-large bg-content2 p-3">
                <div className="font-semibold text-sm">{username}</div>
                <div className="text-sm">{content}</div>
            </div>
        </div>
    )
}
