"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    findManyPostCommentReports,
    FindManyPostCommentReportsOutputData
} from "@services"

import { ErrorResponse } from "@common"
import { PostCommentReportItemAction, PostCommentReportItemState, usePostCommentReportItemReducer } from "./usePostCommentReportItemReducer"
import useSWR, { SWRResponse } from "swr"

export interface PostCommentReportItemContextValue {
    reducer: [PostCommentReportItemState, React.Dispatch<PostCommentReportItemAction>],
    swrs: {
        postCommentReportsSwr: SWRResponse<FindManyPostCommentReportsOutputData | undefined, ErrorResponse>
    },
}

export const ROWS_PER_PAGE = 10

export const PostCommentReportItemContext = createContext<PostCommentReportItemContextValue | null>(null)

const WrappedPostCommentReportItem = ({ children }: { children: ReactNode }) => {
    const reducer = usePostCommentReportItemReducer()

    const fetchPostCommentReports = useCallback(
        async ([key]: [number, string]) => {
            return await findManyPostCommentReports(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        reportPostCommentId: true,
                        postCommentId: true,
                        accountId: true,
                        title: true,
                        description: true,
                        processNote: true,
                        processStatus: true,
                        reportedPostComment: {
                            postCommentId: true,
                            html: true,
                            postCommentMedias: {
                                mediaId: true,
                                mediaType: true,
                                postCommentMediaId: true,
                            },
                            isRewardable: true,
                            isSolution  : true,
                            numberOfLikes: true,
                            post: {
                                title: true,
                            },
                            createdAt: true,
                            creator: {
                                accountId: true,
                                username: true,
                            },
                        },

                        reporterAccount: {
                            avatarUrl: true,
                            kind: true,
                            avatarId: true,
                            accountId: true,
                            username: true,
                            email: true,
                        },
                        createdAt: true,
                        updatedAt: true,
                        
                    },
                    metadata: {
                        count: true,
                    },
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const postCommentReportsSwr = useSWR<FindManyPostCommentReportsOutputData | undefined, ErrorResponse>(
        [page, "POST_COMMENT_REPORTS"],
        fetchPostCommentReports,
        {
            keepPreviousData: true,
        }
    )

    const postCommentReportItemContextValue: PostCommentReportItemContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                postCommentReportsSwr,
            },
        }),
        [reducer, postCommentReportsSwr]
    )

    return (
        <PostCommentReportItemContext.Provider value={postCommentReportItemContextValue}>
            {children}
        </PostCommentReportItemContext.Provider>
    )
}

export const PostCommentReportItemProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WrappedPostCommentReportItem>
            {children}
        </WrappedPostCommentReportItem>
    )
}