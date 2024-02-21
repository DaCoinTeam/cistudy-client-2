import React, { useContext } from "react"
import { ContentItem } from "./ContentItem"
import { PostCardPropsContext } from "../index"

export const BodyContent = () => {
    const { post } = useContext(PostCardPropsContext)!
    return (
        <div className="flex flex-col gap-4 overflow-auto">
            {post.postContents.map((postContent) => (
                <ContentItem
                    key={postContent.postContentId}
                    postContent={postContent}
                />
            ))}
        </div>
    )
}
