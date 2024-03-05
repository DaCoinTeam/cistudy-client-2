import React, { createContext, useMemo } from "react"
import { PostCommentEntity } from "@common"
import { Avatar, Spacer, useDisclosure } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import {
    TextRenderer,
    MediaGroup,
} from "../../../../../../../../../../../_shared"
import { Actions } from "./Actions"
import { Replies } from "./Replies"

interface CommentItemProps {
  postComment: PostCommentEntity;
}

interface CommentItemContextValue {
  props: CommentItemProps;
  disclosures: {
    commentDisclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onOpenChange: () => void;
    }
  }
}

export const CommentItemContext = createContext<CommentItemContextValue | null>(
    null
)

export const CommentItem = (props: CommentItemProps) => {
    const { postComment } = props
    const { html, postCommentMedias, creator } = postComment
    const { avatarId, username } = creator

    const commentDisclosure = useDisclosure()

    const commentItemContextValue: CommentItemContextValue = useMemo(
        () => ({
            props,
            disclosures: {
                commentDisclosure
            }
        }),
        [props, commentDisclosure]
    )

    return (
        <CommentItemContext.Provider value={commentItemContextValue}>
            <div className="flex gap-4">
                <Avatar src={getAssetUrl(avatarId)} />
                <div className="flex-1">
                    <div className="p-3 rounded-large bg-content2 w-fit">
                        <div className="font-semibold "> {username} </div>
                        <TextRenderer html={html} />
                    </div>
                    {postCommentMedias.length ? (
                        <>
                            <MediaGroup
                                medias={postCommentMedias?.map(
                                    ({ postCommentMediaId, mediaId, mediaType }) => ({
                                        key: postCommentMediaId,
                                        mediaId,
                                        mediaType,
                                    })
                                )}
                            />
                        </>
                    ) : null}
                    <Spacer y={1} />
                    <Actions />
                    <Replies />
                </div>
            </div>
        </CommentItemContext.Provider>
    )
}
