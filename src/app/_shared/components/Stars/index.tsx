"use client"
import React from "react"
import { Rating } from "react-simple-star-rating"
import { StarIcon } from "react-simple-star-rating/dist/components/StarIcon"

interface StarsProps {
    className?: string
    readonly?: boolean
    initialValue?: number
}

export const Stars = (props: StarsProps) => {
    const { className, readonly, initialValue } = props

    const onPointerEnter = () => console.log("Enter")
    const onPointerLeave = () => console.log("Leave")
    const onPointerMove = (value: number, index: number) => console.log(value, index)


    return (
        <div>
            <Rating
                fillIcon={<StarIcon size={20}  SVGstrokeColor="yellow" />}
                emptyIcon={<StarIcon size={20}  />}
                className={`${className ?? ""}`}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                transition
                readonly={readonly}
                initialValue={initialValue}

            />
        </div>
    
    )
}