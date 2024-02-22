import React, { useContext } from "react"
import { ContentItem } from "./ContentItem"
import { PostCardContext } from "../index"

export const BodyContent = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state
    return (
        <div className="flex flex-col gap-4 overflow-auto">
            {post?.postContents?.map((postContent) => (
                <ContentItem
                    key={postContent.postContentId}
                    postContent={postContent}
                />
            ))}
        </div>
    )
}
