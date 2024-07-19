import React from "react"
import { CardHorizontalSkeleton } from "./CardHorizontalSkeleton"

export const CardListHorizontalSkeleton = () => {
    return (
        <div className="flex flex-col space-y-10">
            {Array.from({length: 3}).map((_, index) => (
                <div key={`card_horizontal_skeleton_${index}`}>
                    <CardHorizontalSkeleton/>
                </div>
            ))}
 
        </div>

    )
}