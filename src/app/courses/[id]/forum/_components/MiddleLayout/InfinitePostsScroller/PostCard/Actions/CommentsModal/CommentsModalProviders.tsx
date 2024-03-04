"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import {
    findManyPostComments,
    FindManyPostCommentsOutputData,
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

export const COLUMNS_PER_PAGE = 3

export const CommentsModalContext =
  createContext<CommentsModalContextValue | null>(null)

const WrappedCommentsModalProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId } = post

    const fetchPostComments = useCallback(async (key: number) => {
        return await findManyPostComments(
            {
                postId,
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
                        avatarId: true,
                        username: true,
                    },
                    updatedAt: true,
                    liked: true,
                },
                metadata: {
                    count: true,
                },
            }
        )
    }, [])

    const postCommentsSwr = useSWRInfinite(
        (key) => [key, "POST_COMMENTS"],
        fetchPostComments,
        {
            revalidateFirstPage: false,
        }
    )

    const commentsModalContextValue: CommentsModalContextValue = useMemo(
        () => ({
            swrs: {
                postCommentsSwr,
            },
        }),
        [postCommentsSwr]
    )

    return (
        <CommentsModalContext.Provider value={commentsModalContextValue}>
            {children}
        </CommentsModalContext.Provider>
    )
}

export const CommentsModalProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCommentsModalProviders>{children}</WrappedCommentsModalProviders>
    </SWRConfig>
)
