"use client"
import React, { useContext } from "react"
import { ContentItem } from "./ContentItem"
import { FormikContext } from "../../FormikProviders"

export const ContentsDisplay = () => {
    const { values } = useContext(FormikContext)!
    const { contents } = values

    const renderContents = contents.map((content) => (
        <ContentItem key={content.key} content={content} />
    ))

    return (
        <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
            {renderContents}
        </div>
    )
}
