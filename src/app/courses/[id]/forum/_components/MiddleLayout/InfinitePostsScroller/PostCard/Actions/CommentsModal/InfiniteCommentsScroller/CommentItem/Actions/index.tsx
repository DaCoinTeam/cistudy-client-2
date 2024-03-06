"use client"
import {
    ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
    HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid"
import {
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { CommentItemContext } from ".."
import { toggleLikePostComment } from "../../../../../../../../../../../../../services/server"
import { CommentsModalContext } from "../../../CommentsModalProviders"

export const Actions = () => {
    const { props, disclosures } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId, liked, numberOfLikes } = postComment
    const { commentDisclosure } = disclosures
    const { onOpenChange, isOpen } = commentDisclosure

    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { mutate } = postCommentsSwr

    const onLikePress = async () => {
        await toggleLikePostComment({
            data: {
                postCommentId,
            },
        })
        await mutate()
    }

    return (
        <div className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
                <Link onPress={onLikePress} as="button">
                    {
                        liked ?
                            <SolidHeartIcon height={20} width={20}/> 
                            : <HeartIcon height={20} width={20}/>
                    }
                </Link>
                <div className="text-primary text-sm">{numberOfLikes}</div>
            </div>
            <Link onPress={onOpenChange} as="button" size="sm">
                {
                    isOpen ? <SolidChatBubbleOvalLeftEllipsisIcon height={20} width={20}/> 
                        : <ChatBubbleOvalLeftEllipsisIcon height={20} width={20}/> 
                }
               
            </Link>
        </div>
    )
}
