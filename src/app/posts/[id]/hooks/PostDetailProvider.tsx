"use client"
import React from "react"
import { ErrorResponse, PostEntity } from "@common"
import { findManyPostComments, FindManyPostCommentsOutputData, findOnePost } from "@services"
import { ReactNode, createContext, useCallback, useMemo } from "react"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { useParams } from "next/navigation"

export interface PostDetailContextValue {
    swrs: {
        postCommentsSwr: SWRInfiniteResponse<FindManyPostCommentsOutputData, ErrorResponse>,
        postSwr: SWRResponse<PostEntity, ErrorResponse>,
    }
}

export const COLUMNS_PER_PAGE = 5

export const PostDetailContext = createContext<PostDetailContextValue | null>(null)

const WrappedPostDetailProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams()
    const postId = params.id as string

    const fetchPost = useCallback(async () => {
        return await findOnePost(
            {
                params: {
                    postId
                },
            },
            {
                postMedias: {
                    mediaId: true,
                    postId: true,
                    mediaType: true,
                    postMediaId: true,
                },
                creator: {
                    accountId: true,
                    avatarId: true,
                    username: true,
                    avatarUrl: true,
                    kind: true
                },
                course: {
                    courseId: true,
                    title: true,
                },
                postId: true,
                courseId: true,
                title: true,
                html: true,
                isRewardable: true,
                isPostOwner: true,
                isCompleted: true,
                numberOfRewardableCommentsLeft: true,
                numberOfRewardableLikesLeft: true,
                numberOfLikes: true,
                liked: true,
                createdAt: true,
                updatedAt: true,
                numberOfComments: true,
                postComments: {
                    postId: true,
                    postCommentId: true,
                    html: true,
                    postCommentMedias: {
                        mediaId: true,
                        postCommentMediaId: true,
                        mediaType: true,
                    },
                    numberOfLikes: true,
                    creator: {
                        accountId: true,
                        avatarId: true,
                        username: true,
                        avatarUrl: true,
                        kind: true
                    },
                    updatedAt: true,
                    liked: true,
                    createdAt: true,
                    numberOfReplies: true,
                },
            }
        )
    }, [postId])

    const fetchPostComments = useCallback(async ([key, ]: [number, string]) => {
        return await findManyPostComments(
            {
                params: {
                    postId
                },
                options: {
                    skip: COLUMNS_PER_PAGE * key,
                    take: COLUMNS_PER_PAGE,
                },
            },
            {
                results: {
                    postId: true,
                    postCommentId: true,
                    html: true,
                    isCommentOwner: true,
                    isRewardable: true,
                    isSolution: true,
                    postCommentMedias: {
                        mediaId: true,
                        postCommentMediaId: true,
                        mediaType: true,
                    },
                    numberOfLikes: true,
                    creator: {
                        accountId: true,
                        avatarId: true,
                        username: true,
                        avatarUrl: true,
                        kind: true
                    },
                    updatedAt: true,
                    liked: true,
                    createdAt: true,
                    numberOfReplies: true,
                },
                metadata: {
                    count: true,
                },
            }
        )
    }, [postId])

    const postCommentsSwr = useSWRInfinite(
        (key) => [key, "POST_COMMENTS"],
        fetchPostComments,
        {
            revalidateFirstPage: false,
        }
    )

    const postSwr = useSWR([postId, "POST"], fetchPost)

    const PostDetailContextValue: PostDetailContextValue = useMemo(
        () => ({
            swrs: {
                postCommentsSwr,
                postSwr
            },
        }),
        [postCommentsSwr, postSwr]
    )

    return (
        <PostDetailContext.Provider value={PostDetailContextValue}>
            {children}
        </PostDetailContext.Provider>
    )
}

export const PostDetailProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig value={{ provider: () => new Map() }}>
            <WrappedPostDetailProvider>
                {children}
            </WrappedPostDetailProvider>
        </SWRConfig>
    )
}