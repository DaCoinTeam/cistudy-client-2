import React, { createContext, useMemo } from "react"
import { PostCommentEntity, parseTimeAgo } from "@common"
import { Avatar, Spacer, useDisclosure } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import {
    TextRenderer,
    MediaGroup,
} from "../../../../../../../../../../../../_shared"
import { Actions } from "./Actions"
import { Replies } from "./Replies"
import { MoreButton } from "./MoreButton"

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
    };
  };
}

export const CommentItemContext = createContext<CommentItemContextValue | null>(
    null
)

export const CommentItem = (props: CommentItemProps) => {
    const { postComment } = props
    const { html, postCommentMedias, creator, createdAt, updatedAt } =
    postComment
    const { avatarId, username } = creator

    const commentDisclosure = useDisclosure()

    const commentItemContextValue: CommentItemContextValue = useMemo(
        () => ({
            props,
            disclosures: {
                commentDisclosure,
            },
        }),
        [props, commentDisclosure]
    )

    const isEdited = createdAt !== updatedAt

    return (
        <CommentItemContext.Provider value={commentItemContextValue}>
            <div className="flex gap-2 group/comment">
                <Avatar src={getAssetUrl(avatarId)} />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold"> {username} </div>
                            <div className="text-xs text-foreground-400 flex gap-2 items-center">
                                <div>{parseTimeAgo(updatedAt)}</div>
                                {isEdited ? <div>Edited</div> : null}
                            </div>
                        </div>
                        <MoreButton className="transition-opacity opacity-0 group-hover/comment:opacity-100" />
                    </div>
                    <Spacer y={2} />
                    <div className="bg-content2 rounded-medium p-2.5">
                        <TextRenderer html={html} />
                        <MediaGroup
                            className="mt-4"
                            medias={postCommentMedias?.map(
                                ({ postCommentMediaId, mediaId, mediaType }) => ({
                                    key: postCommentMediaId,
                                    mediaId,
                                    mediaType,
                                })
                            )}
                        />
                    </div>
                    <Spacer y={2} />
                    <Actions />
                    <Replies className="mt-3" />
                </div>
            </div>
        </CommentItemContext.Provider>
    )
}
