import React, { useContext } from "react"
import { ScrollShadow } from "@nextui-org/react"
import { CommentsModalContext } from "../CommentsModalProviders"
import { CommentItem } from "./CommentItem"

export const CommentsBody = () => {
    const { state } = useContext(CommentsModalContext)!
    const { postComments } = state

    const renderCommentBody = () => (
        <div className="flex flex-col gap-4">
            {postComments.map((postComment) => (
                <CommentItem
                    key={postComment.postCommentId}
                    postComment={postComment}
                />
            ))}
        </div>
    )

    return (
        <ScrollShadow className="h-[350px]">
            <div className="flex flex-col gap-4">{renderCommentBody()}</div>
        </ScrollShadow>
    )
}
