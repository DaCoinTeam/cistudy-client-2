import React, { useContext } from "react"
import { Title } from "./Title"
import { TextEditor } from "../../../../../../../../_shared"
import { FormikContext } from "../FormikProviders"

export const EditSection = () => {
    const { values, setFieldValue } = useContext(FormikContext)!

    const content = values.content
    
    const setContent = (content: string) =>
        setFieldValue("content", content)

    return (
        <div className="flex-1">
            <Title />
            <TextEditor content={content} setContent={setContent} />
        </div>
    )
}
