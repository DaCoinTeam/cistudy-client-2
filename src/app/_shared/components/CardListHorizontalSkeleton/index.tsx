import React from "react"
import { CardHorizontalSkeleton } from "./CardHorizontalSkeleton"

export const CardListHorizontalSkeleton = () => {
    return (
        <div className="flex flex-col space-y-10">
            <CardHorizontalSkeleton/>
            <CardHorizontalSkeleton/>
            <CardHorizontalSkeleton/>
        </div>

    )
}