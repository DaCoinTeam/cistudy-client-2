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
import { toggleLikePostComment } from "@services"
import { CommentsModalContext } from "../../../CommentsModalProviders"

export const Actions = () => {
    const { props, disclosures } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId, liked, numberOfLikes, numberOfReplies } = postComment
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
        <div className="items-center flex justify-between">
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                    <Link onPress={onLikePress} as="button">
                        {
                            liked ?
                                <SolidHeartIcon height={20} width={20}/> 
                                : <HeartIcon height={20} width={20}/>
                        }
                    </Link>
                    <div className="text-primary text-sm">{numberOfLikes}</div>
                </div>
                <div className="flex gap-2 items-center">
                    <Link onPress={onOpenChange} as="button">
                        {
                            isOpen ? <SolidChatBubbleOvalLeftEllipsisIcon height={20} width={20}/> 
                                : <ChatBubbleOvalLeftEllipsisIcon height={20} width={20}/> 
                        }
                    </Link>
                    <div className="text-primary text-sm">{numberOfReplies}</div>
                </div>
            </div>
        </div>   
    )
}