import React, { useContext } from "react"
import { ScrollShadow } from "@nextui-org/react"
import {
    CommentsModalContext,
} from "../CommentsModalProviders"
import { CommentItem } from "./CommentItem"
import { PostCommentEntity } from "@common"

export const CommentsBody = () => {
    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { data } = postCommentsSwr

    if (!data) return null

    const getPostComments = () => {
        if (!data) return []
        const postsReturn: Array<PostCommentEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            postsReturn.push(...results)
        })
        return postsReturn
    }

    // const getPages = () => {
    //     if (!data) return 0
    //     const last = data.at(-1)
    //     if (!last) return 0
    //     return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    // }

    const renderCommentBody = () => (
        <div className="flex flex-col gap-4">
            {getPostComments().map((postComment) => (
                <CommentItem
                    key={postComment.postCommentId}
                    postComment={postComment}
                />
            ))}
        </div>
    )

    return (
        <ScrollShadow size={20} className="h-[500px]">
            <div className="flex flex-col gap-4">{renderCommentBody()}</div>
        </ScrollShadow>
    )
}
