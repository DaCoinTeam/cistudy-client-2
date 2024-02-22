import { PostCommentEntity, isErrorResponse } from "@common"
import { Card } from "@nextui-org/react"
import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react"
import { findOnePostComment } from "@services"
import { CommentItemAction, CommentItemState, useCommentItemReducer } from "./useCommentItemReducer"

interface CommentItemProps {
  postComment: PostCommentEntity;
}

interface ContentItemContextValue {
    state: CommentItemState;
    dispatch: React.Dispatch<CommentItemAction>;
    functions: {
      fetchAndSetPostComment: () => Promise<void>;
    };
  }
  
export const CommentItemContext = createContext<ContentItemContextValue | null>(null)
  
export const CommentItem = (props: CommentItemProps) => {
    const { postCommentId } = props.postComment
    const [ state, dispatch ] = useCommentItemReducer()

    const fetchAndSetPostComment = useCallback(async () => {
        const response = await findOnePostComment(
            {
                postCommentId,
            },
            {
                postCommentId: true,
                creator: {
                    userId: true,
                    avatarId: true
                },
                postCommentContents: {
                    postCommentContentId: true,
                    contentType: true,
                    postCommentContentMedias: {
                        postCommentContentMediaId: true,
                        mediaId: true,
                    },
                    text: true,
                },
            }
        )
        console.log(response)
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_POST_COMMENT",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetPostComment()
        }
        handleEffect()
    }, [])

    const contentItemContextValue: ContentItemContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetPostComment,
            },
        }),
        [state]
    )

    return (
        <CommentItemContext.Provider value={contentItemContextValue}>
            <WrappedCommentItem/>
        </CommentItemContext.Provider>
    )
}

const WrappedCommentItem = () => {
    const { state } = useContext(CommentItemContext)!
    const { postComment } = state

    return (
        <Card>
            {JSON.stringify(postComment)}
        </Card>
    )
}
