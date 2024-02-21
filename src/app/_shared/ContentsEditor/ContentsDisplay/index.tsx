"use client"
import React, { useContext, useMemo } from "react"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { ContentItem } from "./ContentItem"
import { v4 as uuid4 } from "uuid"

export const ContentsDisplay = () => {
    const { state } = useContext(ContentsEditorContext)!
    const { postContents } = state

    const renderPostContents = useMemo(
        () =>
            postContents.map((postContent) => (
                <ContentItem key={uuid4()} postContent={postContent} />
            )),
        [postContents.length]
    )

    return <div className="flex flex-col gap-2">{renderPostContents}</div>
}
