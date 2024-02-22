import { CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import { PostCardContext } from "../../../../index"
import { CommentItem } from "./CommentItem"

export const CommentsBody = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    const renderCommentBody = () => (
        <CardBody className="p-4">
            {post?.postComments?.map((postComment) => (
                <CommentItem
                    key={postComment.postCommentId}
                    postComment={postComment}
                />
            ))}
        </CardBody>
    )

    return <div className="flex flex-col gap-4">{renderCommentBody()}</div>
}
