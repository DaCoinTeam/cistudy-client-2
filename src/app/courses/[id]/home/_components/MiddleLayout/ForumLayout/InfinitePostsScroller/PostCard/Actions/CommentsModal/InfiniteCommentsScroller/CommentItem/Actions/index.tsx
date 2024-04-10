"use client"
import {
    ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
    HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid"
import {
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { CommentItemContext } from ".."
import { toggleLikePostComment } from "@services"
import { CommentsModalContext } from "../../../CommentsModalProvider"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../../_components"

export const Actions = () => {
    const { props, disclosures } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId, liked, numberOfLikes, numberOfReplies } = postComment
    const { commentDisclosure } = disclosures
    const { onOpenChange, isOpen } = commentDisclosure

    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { mutate } = postCommentsSwr

    const { notify } = useContext(RootContext)!

    const onLikePress = async () => {
        const { earnAmount } = await toggleLikePostComment({
            data: {
                postCommentId,
            },
        })

    notify!({
        type: ToastType.Earn,
        data: {
            earnAmount: earnAmount ?? 0,
        },
    })

    await mutate()
    }

    return (
        <div className="items-center flex justify-between">
            <div className="flex gap-2 items-center">
                <Button
                    color="primary"
                    variant="light"
                    onPress={onLikePress}
                    className="px-2.5 min-w-0"
                    startContent={
                        <>
                            {liked ? (
                                <SolidHeartIcon height={20} width={20} />
                            ) : (
                                <HeartIcon height={20} width={20} />
                            )}
                        </>
                    }
                >
                    {numberOfLikes}
                </Button>
                <Button
                    color="primary"
                    variant="light"
                    className="px-2.5 min-w-0"
                    onPress={onOpenChange}
                    startContent={
                        <>
                            {isOpen ? (
                                <SolidChatBubbleOvalLeftEllipsisIcon height={20} width={20} />
                            ) : (
                                <ChatBubbleOvalLeftEllipsisIcon height={20} width={20} />
                            )}
                        </>
                    }
                >
                    {numberOfReplies}
                </Button>
            </div>
        </div>
    )
}
