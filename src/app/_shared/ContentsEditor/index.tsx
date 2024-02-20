import React from "react"
import { AddContentBox } from "./AddContentBox"
import { ContentsDisplay } from "./ContentsDisplay"
import { ContentsEditorsProviders } from "./ContentsEditorProviders"
import { Spacer } from "@nextui-org/react"

export const WrappedContentsEditor = () => {
    return (
        <div>
            <ContentsDisplay />
            <Spacer y={6}/>
            <AddContentBox />
        </div>
    )
}

export const ContentsEditor = () => {
    return (
        <ContentsEditorsProviders>
            <WrappedContentsEditor />
        </ContentsEditorsProviders>
    )
}
