import React, { useCallback, useContext } from "react"
import {
    MediaUploader,
    TextEditor,
} from "../../../../../../../../../../../../../_shared"
import { FormikContext } from "../FormikProviders"
import { AppendKey, Media } from "@common"
import { Spacer } from "@nextui-org/react"

export const EditSection = () => {
    const { values, setFieldValue } = useContext(FormikContext)!

    const { html, postCommentMedias } = values

    const setHtml = useCallback(
        (html: string) => setFieldValue("html", html),
        [html]
    )

    const setPostCommentMedias = useCallback(
        (postMedias: Array<AppendKey<Media>>) =>
            setFieldValue("postCommentMedias", postMedias),
        [postCommentMedias]
    )

    return (
        <div>
            <TextEditor html={html} setHtml={setHtml} />
            <Spacer y={4} />
            <MediaUploader
                medias={postCommentMedias}
                setMedias={setPostCommentMedias}
            />
        </div>
    )
}
