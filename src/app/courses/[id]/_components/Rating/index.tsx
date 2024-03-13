import React from "react"
// import {StarIcon as StarIconOutline} from "@heroicons/react/24/outline"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {faStarHalfStroke, faStar} from "@fortawesome/free-solid-svg-icons"
import { Spacer } from "@nextui-org/react"

interface RatingProps {
    isHeading?: boolean,
    stars: number
}
const Rating = ({isHeading, stars} : RatingProps) => {
    const star = Array(Math.floor(stars)).fill(0)
    const halfStar = Array(5 - Math.floor(stars)).fill(0)
    
    return (
        <div className="flex items-center">
            {isHeading ? (
                <>
                    {star.map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar}  className="text-yellow-500 w4 h-4 me-0.5 " />
                    ))}
                    {halfStar.map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStarHalfStroke}  className="text-yellow-500 w4- h-4  me-0.5 " />
                    ))}
                    <p className="ms-2 text-xl font-bold text-gray-900 dark:text-white"> {stars} </p>
                    <Spacer x={1} />
                    <a href="#" className="text-xl font-bold text-gray-900  dark:text-white">(73 reviews)</a>
                </>
            ): (
                <>
                    {star.map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar}  className="text-yellow-500 w-5 h-5 me-0.5" />
                    ))}
                    {halfStar.map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStarHalfStroke}  className="text-yellow-500 w-5 h-5 me-0.5" />
                    ))}
                   
                    <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{stars}</p>
                    {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>  */}
                    <Spacer x={1} />
                    <a href="#" className="text-sm font-medium  text-gray-900 dark:text-white">(73 reviews)</a>
                </>
            )}
    
        </div>
    )
}
export default Rating