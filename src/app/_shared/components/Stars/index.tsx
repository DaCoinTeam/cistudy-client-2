"use client"
import React from "react"
import { Rating } from "react-simple-star-rating"
// import { HiStar } from "react-icons/hi";
// import { HiOutlineStar } from "react-icons/hi2";

import {StarIcon} from "@heroicons/react/24/solid"
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
        <div >
            <Rating
                fillIcon={<StarIcon width={20} height={20}  className="inline"/>}
                emptyIcon={<StarIcon width={20} height={20} className="inline" />}
                className={`${className ?? ""} `}
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