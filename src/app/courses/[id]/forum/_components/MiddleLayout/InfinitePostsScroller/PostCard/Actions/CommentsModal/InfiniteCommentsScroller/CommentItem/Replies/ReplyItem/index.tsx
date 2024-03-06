import { Avatar, Spacer } from "@nextui-org/react"
import React from "react"
import { PostCommentReplyEntity, parseTimeAgo } from "@common"
import { getAssetUrl } from "@services"

interface ReplyItemProps {
  postCommentReply: PostCommentReplyEntity;
}

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, createdAt, content } = postCommentReply
    const { avatarId, username } = creator

    return (
        <div className="flex gap-2">
            <Avatar size="sm" src={getAssetUrl(avatarId)} />
            <div className="flex-1">
                <div className="font-semibold text-sm"> {username} </div>    
                <div className="text-xs text-foreground-500"> {parseTimeAgo(createdAt)} </div>                  
                <Spacer y={1}/>
                <div className="text-sm">{content}</div>
            </div>
        </div> 
    )
}
