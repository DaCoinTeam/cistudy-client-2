import React, { useContext } from "react"
import { PostCardContext } from "../../../../index"
import { ScrollShadow } from "@nextui-org/react"

export const CommentsBody = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    const renderCommentBody = () => (
        <div className="flex flex-col gap-4">
        </div>
    )

    return (
        <ScrollShadow className="h-[350px]">
            <div className="flex flex-col gap-4">{renderCommentBody()}</div>
        </ScrollShadow>
    )
}
