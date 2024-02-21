import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
} from "react"
import { AddContentBox } from "./AddContentBox"
import { ContentsDisplay } from "./ContentsDisplay"
import {
    ContentsEditorContext,
    ContentsEditorsProviders,
} from "./ContentsEditorProviders"
import { Spacer } from "@nextui-org/react"
import { PostContent } from "./useContentsEditorReducer"

export interface ContentsEditorRefSelectors {
  postContents: Array<PostContent>;
}

export const WrappedContentsEditorRef = forwardRef<ContentsEditorRefSelectors>(
    (_, ref) => {
        const { state } = useContext(ContentsEditorContext)!
        const { postContents } = state

        useImperativeHandle(ref, () => ({
            postContents,
        }))

        return (
            <div>
                <ContentsDisplay />
                <Spacer y={6} />
                <AddContentBox />
            </div>
        )
    }
)

export const ContentsEditorRef = forwardRef<ContentsEditorRefSelectors>(
    (_, ref) => {
        return (
            <ContentsEditorsProviders>
                <WrappedContentsEditorRef ref={ref} />
            </ContentsEditorsProviders>
        )
    }
)
