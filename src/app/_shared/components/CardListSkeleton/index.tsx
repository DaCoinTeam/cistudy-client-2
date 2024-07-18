import React from "react"
import { CardSkeleton } from "./CardSkeleton"

export const CardListSkeleton = () => {
    return (
        <div className="flex flex-row space-x-3">
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
        </div>

    )
}