"use client"
import React, { useContext } from "react"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { ContentItem } from "./ContentItem"
import { v4 as uuid4 } from "uuid"

export const ContentsDisplay = () => {
    const { state } = useContext(ContentsEditorContext)!
    const { postContents } = state

    return (
        <div className="flex flex-col gap-2">
            {postContents.map((postContent) => (
                <ContentItem key={uuid4()} content={postContent} />
            ))}
        </div>
    )
}
