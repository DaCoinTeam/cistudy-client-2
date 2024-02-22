import React from "react"
import { ContentEditor } from "./ContentEditor"
import { Title } from "./Title"

export const EditSection = () => {
    return (
        <div className="flex-1">
            <Title/>
            <ContentEditor/>
        </div>
    )
}