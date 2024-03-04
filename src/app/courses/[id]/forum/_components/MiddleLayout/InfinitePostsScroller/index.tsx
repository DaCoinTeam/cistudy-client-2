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
import { PostEntity } from "@common"

const WrappedInfinitePostsScroller = () => {
    const { swrs } = useContext(InfinitePostsScrollerContext)!
    const { postsSwr } = swrs
    const { data, size, setSize, isValidating } = postsSwr

    const onLoadMore = () => {
        setSize(size + 1)
    }

    // play anim
    if (!data) return null

    const getPosts = () => {
        if (!data) return []
        const postsReturn: Array<PostEntity> = []
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

    return (
        <InfiniteScroll
            className="flex flex-col gap-12"
            pageStart={0}
            initialLoad={false}
            loadMore={onLoadMore}
            hasMore={size < getPages() && !isValidating}
            loader={<CircularProgress key={0} aria-label="Loading..." />}
        >
            {getPosts().map((post) => (
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
