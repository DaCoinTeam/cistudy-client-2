import React, { useContext } from "react"
import { ScrollShadow } from "@nextui-org/react"
import { CommentsModalContext } from "../CommentsModalProviders"
import { CommentItem } from "./CommentItem"
import { concatArrays } from "@common"

export const CommentsBody = () => {
    const { swr } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swr
    const { data } = postCommentsSwr

    const postComments = concatArrays(data)

    const renderCommentBody = () => (
        <div className="flex flex-col gap-4">
            {postComments?.map((postComment) => (
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

