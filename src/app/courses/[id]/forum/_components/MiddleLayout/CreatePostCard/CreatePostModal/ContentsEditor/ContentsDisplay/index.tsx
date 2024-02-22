"use client"
import React, { useContext } from "react"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { ContentItem } from "./ContentItem"

export const ContentsDisplay = () => {
    const { state } = useContext(ContentsEditorContext)!
    const { contents } = state

    const renderContents = contents.map((content) => (
        <ContentItem key={content.key} content={content} />
    ))

    return (
        <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
            {renderContents}
        </div>
    )
}
