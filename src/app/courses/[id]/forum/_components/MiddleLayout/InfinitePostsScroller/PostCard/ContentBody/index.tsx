import React from "react"
import { PostEntity } from "@common"
import { ContentItem } from "./ContentItem"

interface PostCardProps {
  post: PostEntity;
}

export const ContentBody = (props: PostCardProps) => {
    return (
        <div className="flex flex-col gap-4 overflow-auto">
            {props.post.postContents.map((postContent) => (
                <ContentItem
                    key={postContent.postContentId}
                    postContent={postContent}
                />
            ))}
        </div>
    )
}
