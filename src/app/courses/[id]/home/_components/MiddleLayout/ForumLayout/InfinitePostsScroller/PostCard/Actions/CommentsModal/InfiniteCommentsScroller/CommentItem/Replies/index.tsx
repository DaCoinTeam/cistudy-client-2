import React, { useContext } from "react"
import { CreateReply } from "./CreateReply"
import { ReplyItem } from "./ReplyItem"
import {
    COLUMNS_PER_PAGE,
    RepliesContext,
    RepliesProvider,
} from "./RepliesProvider"
import { CommentItemContext } from ".."
import { PostCommentReplyEntity } from "@common"
import { Link } from "@nextui-org/react"

interface RepliesProps {
    className?: string
}

const WrappedReplies = (props: RepliesProps) => {
    const { className } = props

    const { swrs } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { data, size, setSize } = postCommentRepliesSwr

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

    const getPages = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    }

    const isLoadMore = size < getPages()

    const renderLoadMoreButton = () =>  {
        const onPress = () => setSize(size +1)
        return (
            <>
                {
                    isLoadMore ?  <Link as="button" onPress={onPress} size="sm">
                Load More
                    </Link> : null
                }
            </>  
        )}

    return (
        <div className={`flex flex-col gap-3 ${className ?? ""}`}>
            {getPostCommentReplies().map((postCommentReply) => (
                <ReplyItem
                    key={postCommentReply.postCommentReplyId}
                    postCommentReply={postCommentReply}
                />
            ))}
            {renderLoadMoreButton()}
            <CreateReply />
        </div>
    )
}

export const Replies = (props: RepliesProps) => {
    const { disclosures } = useContext(CommentItemContext)!
    const { commentDisclosure } = disclosures
    const { isOpen } = commentDisclosure
    return (
        <>
            {isOpen ? (
                <RepliesProvider>
                    <WrappedReplies {...props}/>
                </RepliesProvider>
            ) : null}
        </>
    )
}
