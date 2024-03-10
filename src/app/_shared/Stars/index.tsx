"use client"
import { StarIcon } from "@heroicons/react/24/solid"
import React from "react"
import { Rating } from "react-simple-star-rating"

interface StarsProps {
    className?: string
    readonly?: boolean
}

export const Stars = (props: StarsProps) => {
    const { className, readonly } = props

    const onPointerEnter = () => console.log("Enter")
    const onPointerLeave = () => console.log("Leave")
    const onPointerMove = (value: number, index: number) => console.log(value, index)


    return (
        <div>
            <Rating
                fillIcon={<StarIcon className="inline" width={20} height={20} />}
                emptyIcon={<StarIcon className="inline" width={20} height={20} />}
                className={`${className ?? ""}`}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                transition
                readonly={readonly}
            />
        </div>
    
    )
}