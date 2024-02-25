import React, { useContext } from "react"
import { PostCardContext } from "../index"
import { TextRenderer, MediaGroup } from "../../../../../../../../_shared"

export const BodyContent = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <TextRenderer html={post?.html} />
            <MediaGroup
                medias={post?.postMedias.map(({ mediaId, mediaType, postMediaId }) => ({
                    key: postMediaId,
                    mediaId,
                    mediaType,
                }))}
            />
        </div>
    )
}
