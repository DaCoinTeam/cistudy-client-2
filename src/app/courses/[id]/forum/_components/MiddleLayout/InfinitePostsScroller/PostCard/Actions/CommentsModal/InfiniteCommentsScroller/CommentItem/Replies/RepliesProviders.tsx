"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import {
    FindManyPostCommentRepliesOutputData,
    findManyPostCommentReplies,
} from "@services"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { SWRConfig } from "swr"
import { CommentItemContext } from ".."

export interface RepliesContextValue {
  swrs: {
    postCommentRepliesSwr: SWRInfiniteResponse<
      FindManyPostCommentRepliesOutputData,
      ErrorResponse
    >;
  };
}

export const COLUMNS_PER_PAGE = 5

export const RepliesContext = createContext<RepliesContextValue | null>(null)

const WrappedRepliesProviders = ({ children }: { children: ReactNode }) => {
    const { props } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId } = postComment

    const fetchPostCommentReplies = useCallback(
        async ([key]: [number, string]) => {
            return await findManyPostCommentReplies(
                {
                    params: {
                        postCommentId,
                    },
                    options: {
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        postCommentReplyId: true,
                        content: true,
                        creator: {
                            avatarId: true,
                            username: true,
                        },
                        createdAt: true,
                        updatedAt: true
                    },
                    metadata: {
                        count: true
                    }
                }
            )
        },
        []
    )

    const postCommentRepliesSwr = useSWRInfinite(
        (key) => [key, "POST_COMMENT_REPLIES"],
        fetchPostCommentReplies,
        {
            revalidateFirstPage: false,
        }
    )

    const repliesContextValue: RepliesContextValue = useMemo(
        () => ({
            swrs: {
                postCommentRepliesSwr,
            },
        }),
        [postCommentRepliesSwr]
    )

    return (
        <RepliesContext.Provider value={repliesContextValue}>
            {children}
        </RepliesContext.Provider>
    )
}

export const RepliesProviders = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedRepliesProviders>{children}</WrappedRepliesProviders>
    </SWRConfig>
)
