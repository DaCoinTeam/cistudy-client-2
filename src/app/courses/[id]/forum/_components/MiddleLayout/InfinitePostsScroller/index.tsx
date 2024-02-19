import React, { useContext } from "react"
import InfiniteScroll from "react-infinite-scroller"
import { ForumContext, NUMBER_OF_POSTS } from "../../../_hooks"
import { CircularProgress } from "@nextui-org/react"
import { PostCard } from "./PostCard"

export const InfinitePostsScroller = () => {
    const { state, functions } = useContext(ForumContext)!
    const { posts, endOfPosts } = state
    const { fetchAndAppendPosts } = functions

    const onLoadMore = async () => {
        await fetchAndAppendPosts({
            take: NUMBER_OF_POSTS,
            skip: posts.length,
        })
    }

    return (
        <InfiniteScroll
            className="flex flex-col gap-12"
            pageStart={0}
            initialLoad={false}
            loadMore={onLoadMore}
            hasMore={!endOfPosts}
            loader={<CircularProgress key={0} aria-label="Loading..." />}
        >
            {posts.map((post) => (
                <PostCard key={post.postId} post={post} />
            ))}
        </InfiniteScroll>
    )
}
