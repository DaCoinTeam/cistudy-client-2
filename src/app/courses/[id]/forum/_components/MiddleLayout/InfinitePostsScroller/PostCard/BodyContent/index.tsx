import React, { useContext } from "react"
import { PostCardContext } from "../index"
import { HTMLRenderer } from "../../../../../../../../_shared"

export const BodyContent = () => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <HTMLRenderer html={post?.html} />
        </div>
    )
}
