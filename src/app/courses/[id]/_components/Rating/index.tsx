import React from "react"
import { StarIcon } from "@heroicons/react/24/solid"

interface RatingProps {
    isHeading?: boolean

}
const Rating = ({isHeading} : RatingProps) => {
    return (
        <div className="flex items-center mt-2">
            {isHeading ? (
                <>
                    <StarIcon   className="text-yellow-400 w-7 h-7 "   />
                    <p className="ms-2 text-lg font-semibold text-gray-900 dark:text-white">4.95 </p>
                    <span className="w-2 h-2 mx-2 bg-gray-500 rounded-full dark:bg-gray-400 "></span>
                    <a href="#" className="text-lg font-semibold text-gray-900  dark:text-white">73 reviews</a>
                </>
            ): (
                <>
                    <StarIcon   className="text-yellow-400 w4- h-4 "   />
                    <p className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">4.95</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
                </>
            )}
    
        </div>
    )
}
export default Rating