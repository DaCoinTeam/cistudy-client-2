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
    onClick?: (value: number) => void
}

export const Stars = (props: StarsProps) => {
    const { className, readonly, initialValue, onClick } = props

    const onPointerMove = (value: number, index: number) => console.log(value, index)


    return (
        <div >
            <Rating
                fillIcon={<StarIcon width={20} height={20}  className="inline"/>}
                emptyIcon={<StarIcon width={20} height={20} className="inline" />}
                className={`${className ?? ""} `}
                onClick={onClick}
                onPointerMove={onPointerMove}
                transition
                readonly={readonly}
                initialValue={initialValue}

            />
        </div>
    
    )
}