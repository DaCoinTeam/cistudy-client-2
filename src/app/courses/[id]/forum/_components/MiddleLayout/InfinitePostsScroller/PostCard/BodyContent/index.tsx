import React, { useContext } from "react"
import { PostCardContext } from ".."
import { TextRenderer, MediaGroup } from "../../../../../../../../_shared"

export const BodyContent = () => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postMedias, html } = post

    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <TextRenderer html={html} />
            <MediaGroup
                medias={postMedias.map(({ mediaId, mediaType, postMediaId }) => ({
                    key: postMediaId,
                    mediaId,
                    mediaType,
                }))}
            />
        </div>
    )
}
