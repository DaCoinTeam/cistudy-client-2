import React from "react"
import { PostEntity } from "@common"
import { ContentItem } from "./ContentItem"

interface BodyContentProps {
  post: PostEntity;
}

export const BodyContent = (props: BodyContentProps) => {
    return (
        <div className="flex flex-col gap-3 overflow-auto">
            {props.post.postContents.map((postContent) => (
                <ContentItem
                    key={postContent.postContentId}
                    postContent={postContent}
                />
            ))}
        </div>
    )
}
