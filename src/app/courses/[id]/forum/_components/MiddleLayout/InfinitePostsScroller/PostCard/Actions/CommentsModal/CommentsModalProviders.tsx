"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import {
    FindManyPostCommentsMetadataOutputData,
    findManyPostComments,
    findManyPostCommentsMetadata,
} from "@services"
import { ErrorResponse, PostCommentEntity } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import useSWR, { Fetcher, SWRConfig, SWRResponse } from "swr"
import { PostCardContext } from "../.."

export interface CommentsModalContextValue {
  swr: {
    postCommentsSwr: SWRInfiniteResponse<
      Array<PostCommentEntity>,
      ErrorResponse
    >;
    postCommentsMetadataSwr: SWRResponse<
      FindManyPostCommentsMetadataOutputData,
      ErrorResponse
    >;
  };
}

export const COLUMNS_PER_PAGE = 5

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

    const fetchPostComments: Fetcher<
    Array<PostCommentEntity>,
    string
  > = useCallback(async (key: string) => {
      return await findManyPostComments(
          {
              postId,
              options: {
                  skip: COLUMNS_PER_PAGE * Number.parseInt(key),
                  take: COLUMNS_PER_PAGE,
              },
          },
          {
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
          }
      )
  }, [])

    const fetchPostCommentsMetadata = useCallback(async () => {
        return await findManyPostCommentsMetadata(
            {
                postId,
            },
            { numberOfPostComments: true }
        )
    }, [])

    const postCommentsSwr = useSWRInfinite(
        (key) => [key.toString(), "FETCH_POST_COMMENTS"],
        fetchPostComments,
        {
            revalidateFirstPage: false,
        }
    )

    const postCommentsMetadataSwr = useSWR(
        ["FETCH_POST_COMMENTS_METADATA"],
        fetchPostCommentsMetadata
    )

    const commentsModalContextValue: CommentsModalContextValue = useMemo(
        () => ({
            swr: {
                postCommentsSwr,
                postCommentsMetadataSwr,
            },
        }),
        [postCommentsSwr, postCommentsMetadataSwr]
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
