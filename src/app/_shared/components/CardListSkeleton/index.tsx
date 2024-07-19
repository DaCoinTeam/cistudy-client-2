import React from "react"
import { CardSkeleton } from "./CardSkeleton"

export const CardListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6">
            {Array.from({length: 3}).map((_, index) => (
                <div key={`card_skeleton_${index}`}>
                    <CardSkeleton/>
                </div>
            ))}

        </div>

    )
}