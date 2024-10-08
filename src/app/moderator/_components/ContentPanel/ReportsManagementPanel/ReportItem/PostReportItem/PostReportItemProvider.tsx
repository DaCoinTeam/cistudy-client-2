"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    findManyPostReports,
    FindManyPostReportsOutputData
} from "@services"

import { ErrorResponse } from "@common"
import { PostReportItemAction, PostReportItemState, usePostReportItemReducer } from "./usePostReportItemReducer"
import useSWR, { SWRResponse } from "swr"

export interface PostReportItemContextValue {
    reducer: [PostReportItemState, React.Dispatch<PostReportItemAction>],
    swrs: {
        postReportsSwr: SWRResponse<FindManyPostReportsOutputData | undefined, ErrorResponse>
    },
}

export const ROWS_PER_PAGE = 10

export const PostReportItemContext = createContext<PostReportItemContextValue | null>(null)

const WrappedPostReportItem = ({ children }: { children: ReactNode }) => {
    const reducer = usePostReportItemReducer()

    const fetchPostReports = useCallback(
        async ([key]: [number, string]) => {
            return await findManyPostReports(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        reportPostId: true,
                        postId: true,
                        accountId: true,
                        title: true,
                        description: true,
                        processNote: true,
                        processStatus: true,
                        reportedPost: {
                            postId: true,
                            title: true,
                            html: true,
                            createdAt: true,
                            postMedias: {
                                mediaId: true,
                                mediaType: true,
                                postMediaId: true,
                                position: true,
                            },
                            course: {
                                title: true,
                            },
                            creator: {
                                username: true,
                            },
                            numberOfComments: true,
                            numberOfLikes: true,
                            numberOfReports: true,
                        },
                        reporterAccount: {
                            accountId: true,
                            username: true,
                            email: true,
                            avatarId: true,
                            avatarUrl: true,
                            kind: true,
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

    const postReportsSwr = useSWR<FindManyPostReportsOutputData | undefined, ErrorResponse>(
        [page, "POST_REPORTS"],
        fetchPostReports,
        {
            keepPreviousData: true
        }
    )

    const postReportItemContextValue: PostReportItemContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                postReportsSwr
            } 
        }), 
        [reducer, postReportsSwr]
    )

    return (
        <PostReportItemContext.Provider value={postReportItemContextValue}>
            {children}
        </PostReportItemContext.Provider>
    )
}

export const PostReportItemProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WrappedPostReportItem>
            {children}
        </WrappedPostReportItem>
    )
}