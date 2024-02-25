"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"
import {
    CommentsModalAction,
    CommentsModalState,
    useCommentsModalReducer,
} from "./useCommentsModalReducer"
import { findManyPostComments } from "@services"
import { isErrorResponse } from "@common"
import { PostCardContext } from "../../../index"

export interface CommentsModalContextValue {
  state: CommentsModalState;
  dispatch: React.Dispatch<CommentsModalAction>;
  functions: {
    fetchAndSetPostComments: () => Promise<void>;
  };
}

export const CommentsModalContext =
  createContext<CommentsModalContextValue | null>(null)

export const CommentsModalProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useCommentsModalReducer()
    const { postComments } = state
    const { state: postCardState } = useContext(PostCardContext)!
    const { post } = postCardState

    const fetchAndSetPostComments = useCallback(async () => {
        if (post === null) return
        const { postId } = post

        const response = await findManyPostComments({
            postId,
        }, {
            postCommentId: true,
            html: true,
            postCommentMedias: {
                postCommentMediaId: true,
                mediaId: true,
                mediaType: true
            },
            creator: {
                userId: true,
            }
        })
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COMMENTS",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [post, postComments])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetPostComments()
        }
        handleEffect()
    }, [post])

    const commentsModalContextValue: CommentsModalContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetPostComments,
            },
        }),
        [state, dispatch]
    )

    return (
        <CommentsModalContext.Provider value={commentsModalContextValue}>
            {children}
        </CommentsModalContext.Provider>
    )
}
