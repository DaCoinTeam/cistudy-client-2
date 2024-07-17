import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../../_hooks"
import { Stars } from "../../../../../../../_shared"
export const CourseRatingChart = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { courseRatings } = { ...course }
    const {
        numberOf1StarRatings,
        numberOf2StarRatings,
        numberOf3StarRatings,
        numberOf4StarRatings,
        numberOf5StarRatings,
        overallCourseRating,
        totalNumberOfRatings
    } = { ...courseRatings }

    const caculatePercentage = (rating: number) => {
        if(totalNumberOfRatings === 0) return "0%"
        const precent =  (rating / totalNumberOfRatings!) * 100
        return precent.toString() + "%"
    }

    return (
        <div>
            <div className='flex items-end text-center mb-2'>
                <Stars initialValue={overallCourseRating} className='mr-2' readonly />
                <p className='ms-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {overallCourseRating}
                </p>
                <p className='ms-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
          out of
                </p>
                <p className='ms-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
          5
                </p>
            </div>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                {totalNumberOfRatings} ratings
            </p>
            <div className='flex items-center mt-4'>
                <a
                    href='#'
                    className='text-sm font-medium  hover:underline'
                >
          5 star
                </a>
                <div className='w-2/4 h-4 mx-4 bg-gray-200 rounded-xl dark:bg-gray-700'>
                    <div
                        className='h-4 bg-yellow-300 rounded-xl '
                        style={{
                            width: caculatePercentage(numberOf5StarRatings!),
                        }}
                    ></div>
                </div>
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {numberOf5StarRatings}
                </span>
            </div>
            <div className='flex items-center mt-2'>
                <a
                    href='#'
                    className='text-sm font-medium hover:underline'
                >
          4 star
                </a>
                <div className='w-2/4 h-4 mx-4 bg-gray-200 rounded-xl dark:bg-gray-700'>
                    
                    <div
                        className='h-4 bg-yellow-300 rounded-xl '
                        style={{
                            width: caculatePercentage(numberOf4StarRatings!),
                        }}
                    ></div>
                </div>
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {numberOf4StarRatings}
                </span>
            </div>
            <div className='flex items-center mt-2'>
                <a
                    href='#'
                    className='text-sm font-medium  hover:underline'
                >
          3 star
                </a>
                <div className='w-2/4 h-4 mx-4 bg-gray-200 rounded-xl dark:bg-gray-700'>
                    <div
                        className='h-4 bg-yellow-300 rounded-xl'
                        style={{
                            width: caculatePercentage(numberOf3StarRatings!),
                        }}
                    ></div>
                </div>
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {numberOf3StarRatings}
                </span>
            </div>
            <div className='flex items-center mt-2'>
                <a
                    href='#'
                    className='text-sm font-medium  hover:underline'
                >
          2 star
                </a>
                <div className='w-2/4 h-4 mx-4 bg-gray-200 rounded-xl dark:bg-gray-700'>
                    <div
                        className='h-4 bg-yellow-300 rounded-xl'
                        style={{
                            width: caculatePercentage(numberOf2StarRatings!),
                        }}
                    ></div>
                </div>
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {numberOf2StarRatings}
                </span>
            </div>
            <div className='flex items-center mt-2'>
                <a
                    href='#'
                    className='text-sm font-medium  hover:underline'
                >
          1 star
                </a>
                <div className='w-2/4 h-4 mx-4 bg-gray-200 rounded-xl dark:bg-gray-700'>
                    <div
                        className='h-4 bg-yellow-300 rounded-xl'
                        style={{
                            width: caculatePercentage(numberOf1StarRatings!),
                        }}
                    ></div>
                </div>
                <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {numberOf1StarRatings}
                </span>
            </div>
        </div>
    )
}
