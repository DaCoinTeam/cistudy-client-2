"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import {
    FindManyPostCommentsOutputData,
    findManyPostComments,
} from "@services"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { SWRConfig } from "swr"
import { PostCardContext } from "../.."

export interface CommentsModalContextValue {
  swrs: {
    postCommentsSwr: SWRInfiniteResponse<
    FindManyPostCommentsOutputData,
      ErrorResponse
    >;
  };
}

export const COLUMNS_PER_PAGE = 5

export const CommentsModalContext =
  createContext<CommentsModalContextValue | null>(null)

const WrappedCommentsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId } = post

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
                    isRewardable: true,
                    isCommentOwner: true,
                    isSolution: true,
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

    const CommentsModalContextValue: CommentsModalContextValue = useMemo(
        () => ({
            swrs: {
                postCommentsSwr,
            },
        }),
        [postCommentsSwr]
    )

    return (
        <CommentsModalContext.Provider value={CommentsModalContextValue}>
            {children}
        </CommentsModalContext.Provider>
    )
}

export const CommentsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCommentsModalProvider>{children}</WrappedCommentsModalProvider>
    </SWRConfig>
)
