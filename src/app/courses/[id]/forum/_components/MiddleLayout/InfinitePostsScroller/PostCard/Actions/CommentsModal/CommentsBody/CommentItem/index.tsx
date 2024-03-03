import React from "react"
import { PostCommentEntity } from "@common"
import { Avatar, Spacer } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import {
    TextRenderer,
    MediaGroup,
} from "../../../../../../../../../../../_shared"

interface CommentItemProps {
  postComment: PostCommentEntity;
}

export const CommentItem = (props: CommentItemProps) => {
    const { postComment } = props
    const { html, postCommentMedias, creator } = postComment
    const { avatarId, username } = creator
    return (
        <div className="flex gap-4">
            <Avatar src={getAssetUrl(avatarId)} />
            <div className="p-3 rounded-large bg-content2 flex-1">
                <div className="font-semibold leading-none"> {username} </div>
                <Spacer y={3} />
                <TextRenderer html={html} />
                {postCommentMedias.length ? <>
                    <Spacer y={3} />
                    <MediaGroup
                        medias={postCommentMedias?.map(
                            ({ postCommentMediaId, mediaId, mediaType }) => ({
                                key: postCommentMediaId,
                                mediaId,
                                mediaType,
                            })
                        )}
                    />
                </>  : null}
            </div>
        </div>
    )
}
