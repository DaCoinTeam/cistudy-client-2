import { Avatar, Spacer } from "@nextui-org/react"
import React from "react"
import { PostCommentReplyEntity } from "@common"
import { getAssetUrl } from "@services"

interface ReplyItemProps {
    postCommentReply: PostCommentReplyEntity
}

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, content } = postCommentReply
    const { avatarId, username } = creator

    return (
        <div className="flex gap-4">
            <Avatar src={getAssetUrl(avatarId)}/>
            <div className="flex-1 bg-content2 rounded-large p-3 text-sm">
                <div className="font-semibold">
                    {username}
                </div>
                <Spacer y={1}/>
                <div className="text-sm">
                    {content}
                </div >  
            </div>
        </div>
    )
}