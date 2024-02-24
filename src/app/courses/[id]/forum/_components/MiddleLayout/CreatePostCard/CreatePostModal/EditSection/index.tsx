import React, { useCallback, useContext } from "react"
import { Title } from "./Title"
import { MediaUploader, TextEditor } from "../../../../../../../../_shared"
import { FormikContext } from "../FormikProviders"
import { AppendKey, Media } from "@common"
import { Spacer } from "@nextui-org/react"

export const EditSection = () => {
    const { values, setFieldValue } = useContext(FormikContext)!

    const { html, postMedias } = values

    const setHtml = useCallback((html: string) => setFieldValue("html", html), [html])

    const setPostMedias = useCallback((postMedias: Array<AppendKey<Media>>) =>
        setFieldValue("postMedias", postMedias)
    , [postMedias])

    return (
        <div className="flex-1">
            <Title />
            <Spacer y={6}/>
            <TextEditor html={html} setHtml={setHtml} />
            <Spacer y={6}/>
            <MediaUploader medias={postMedias} setMedias={setPostMedias} />
        </div>
    )
}
