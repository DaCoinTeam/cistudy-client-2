import React, { useContext } from "react"
import { CreateReply } from "./CreateReply"
import { ReplyItem } from "./ReplyItem"
import {
    RepliesContext,
    RepliesProviders,
} from "./RepliesProviders"
import { CommentItemContext } from ".."
import { PostCommentReplyEntity } from "../../../../../../../../../../../../../common/types"

interface RepliesProps {
    className?: string
}

const WrappedReplies = (props: RepliesProps) => {
    const { className } = props

    const { swrs } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { data } = postCommentRepliesSwr

    const getPostCommentReplies = () => {
        if (!data) return []
        const postCommentRepliesReturn: Array<PostCommentReplyEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            postCommentRepliesReturn.push(...results)
        })
        return postCommentRepliesReturn
    }

    // const getPages = () => {
    //     if (!data) return 0
    //     const last = data.at(-1)
    //     if (!last) return 0
    //     return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    // }

    return (
        <div className={`flex flex-col gap-3 ${className ?? ""}`}>
            {getPostCommentReplies().map((postCommentReply) => (
                <ReplyItem
                    key={postCommentReply.postCommentReplyId}
                    postCommentReply={postCommentReply}
                />
            ))}
            <CreateReply key={"createReply"} />
        </div>
    )
}

export const Replies = () => {
    const { disclosures } = useContext(CommentItemContext)!
    const { commentDisclosure } = disclosures
    const { isOpen } = commentDisclosure
    return (
        <>
            {isOpen ? (
                <RepliesProviders>
                    <WrappedReplies />
                </RepliesProviders>
            ) : null}
        </>
    )
}
