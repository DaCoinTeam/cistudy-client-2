import { PostCommentEntity, isErrorResponse } from "@common"
import { Avatar, Card, CardBody } from "@nextui-org/react"
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"
import { findOnePostComment, getAssetUrl } from "@services"
import {
    CommentItemAction,
    CommentItemState,
    useCommentItemReducer,
} from "./useCommentItemReducer"
import { ContentItem } from "./ContentItem"

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

export const CommentItemContext = createContext<ContentItemContextValue | null>(
    null
)

export const CommentItem = (props: CommentItemProps) => {
    const { postCommentId } = props.postComment
    const [state, dispatch] = useCommentItemReducer()

    const fetchAndSetPostComment = useCallback(async () => {
        const response = await findOnePostComment(
            {
                postCommentId,
            },
            {
                postCommentId: true,
                creator: {
                    userId: true,
                    avatarId: true,
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
            <WrappedCommentItem />
        </CommentItemContext.Provider>
    )
}

const WrappedCommentItem = () => {
    const { state } = useContext(CommentItemContext)!
    const { postComment } = state

    const renderComment = () => (
        <div className="flex flex-col gap-4">
            {postComment?.postCommentContents.map((postCommentContent) => (
                <ContentItem
                    key={postCommentContent.postCommentContentId}
                    postCommentContent={postCommentContent}
                />
            ))}
        </div>
    )

    return (
        <div className="flex gap-4">
            <Avatar src={getAssetUrl(postComment?.creator?.avatarId)} />
            <Card className="flex-1" shadow="none">
                <CardBody className="p-4 rounded-large bg-content2">
                    {renderComment()}   
                </CardBody>
            </Card>
        </div>
    )
}
