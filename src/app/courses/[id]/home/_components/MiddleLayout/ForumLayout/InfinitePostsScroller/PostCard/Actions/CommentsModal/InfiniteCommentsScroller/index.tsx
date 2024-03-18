import React, { useContext } from "react"
import { CircularProgress, ScrollShadow } from "@nextui-org/react"
import { CommentItem } from "./CommentItem"
import { PostCommentEntity } from "@common"
import InfiniteScroll from "react-infinite-scroller"
import { COLUMNS_PER_PAGE, CommentsModalContext } from "../CommentsModalProvider"

export const InfiniteCommentsScroller = () => {
    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { data, setSize, size, isValidating } = postCommentsSwr

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

    const getPages = () => {
        if (!data) return 0
        const last = data.at(-1)
        if (!last) return 0
        return Math.ceil(last.metadata.count / COLUMNS_PER_PAGE)
    }

    const onLoadMore = () => setSize(size + 1)

    return (
        <ScrollShadow size={20} className="h-[500px]" hideScrollBar>
            <InfiniteScroll
                className="flex flex-col gap-4"
                pageStart={0}
                initialLoad={false}
                loadMore={onLoadMore}
                hasMore={size < getPages() && !isValidating}
                loader={<CircularProgress key={0} aria-label="Loading..." />}
                useWindow={false}
            >
                {getPostComments().map((postComment) => (
                    <CommentItem
                        key={postComment.postCommentId}
                        postComment={postComment}
                    />
                ))}
            </InfiniteScroll>
        </ScrollShadow>
    )
}
