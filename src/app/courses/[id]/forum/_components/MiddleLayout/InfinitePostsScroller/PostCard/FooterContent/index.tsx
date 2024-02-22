import React from "react"
import { Spacer } from "@nextui-org/react"
import { Actions } from "./Actions"
import { CreatorAndStats } from "./CreatorAndStats"

export const FooterContent = () => {
    return (
        <div className="w-full">
            <CreatorAndStats />
            <Spacer y={6} />
            <Actions />
        </div>
    )
}
