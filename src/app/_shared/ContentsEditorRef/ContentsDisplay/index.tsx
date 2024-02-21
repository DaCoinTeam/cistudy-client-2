"use client"
import React, { useContext } from "react"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { ContentItem } from "./ContentItem"

export const ContentsDisplay = () => {
    const { state } = useContext(ContentsEditorContext)!
    const { postContents } = state

    const renderPostContents = postContents.map((postContent) => (
        <ContentItem key={postContent.key} postContent={postContent} />
    ))

    return <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">{renderPostContents}</div>
}
