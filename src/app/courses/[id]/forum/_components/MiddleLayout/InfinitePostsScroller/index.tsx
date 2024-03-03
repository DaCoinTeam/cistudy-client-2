"use client"
import React, { useContext } from "react"
import InfiniteScroll from "react-infinite-scroller"
import { CircularProgress } from "@nextui-org/react"
import { PostCard } from "./PostCard"
import {
    COLUMNS_PER_PAGE,
    InfinitePostsScrollerContext,
    InfinitePostsScrollerProviders,
} from "./InfinitePostsScrollerProviders"
import { concatArrays } from "@common"

const WrappedInfinitePostsScroller = () => {
    const { swr } = useContext(InfinitePostsScrollerContext)!
    const { postsSwr, postsMetadataSwr } = swr
    const { data, size, setSize, isValidating } = postsSwr
    const { data: postsMetadataSwrData } = postsMetadataSwr

    const onLoadMore = () => {
        setSize(size + 1)
    }

    // play anim
    if (!postsMetadataSwrData) return null

    const posts = concatArrays(data)
    const { numberOfPosts } = postsMetadataSwrData
    const numberOfPages = Math.ceil(numberOfPosts / COLUMNS_PER_PAGE)

    return (
        <InfiniteScroll
            className="flex flex-col gap-12"
            pageStart={0}
            initialLoad={false}
            loadMore={onLoadMore}
            hasMore={size < numberOfPages && !isValidating}
            loader={<CircularProgress key={0} aria-label="Loading..." />}
        >
            {posts.map((post) => (
                <PostCard key={post.postId} post={post} />
            ))} 
        </InfiniteScroll>
    )
}

export const InfinitePostsScroller = () => {
    return (
        <InfinitePostsScrollerProviders>
            <WrappedInfinitePostsScroller />
        </InfinitePostsScrollerProviders>
    )
}
