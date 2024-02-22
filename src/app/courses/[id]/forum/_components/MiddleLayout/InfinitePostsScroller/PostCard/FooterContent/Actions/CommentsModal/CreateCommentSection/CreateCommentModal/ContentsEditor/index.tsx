import { AddContentBox } from "./AddContentBox"
import { ContentsDisplay } from "./ContentsDisplay"
import { Spacer } from "@nextui-org/react"

export const ContentsEditor = () => {
    return (
        <div>
            <ContentsDisplay />
            <Spacer y={6} />
            <AddContentBox />
        </div>
    )
}