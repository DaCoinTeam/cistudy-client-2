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
import { Content } from "./useContentsEditorReducer"

export interface ContentsEditorRefSelectors {
  contents: Array<Content>;
}

export const WrappedContentsEditorRef = forwardRef<ContentsEditorRefSelectors>(
    (_, ref) => {
        const { state } = useContext(ContentsEditorContext)!
        const { contents } = state

        useImperativeHandle(ref, () => ({
            contents,
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

export * from "./useContentsEditorReducer"