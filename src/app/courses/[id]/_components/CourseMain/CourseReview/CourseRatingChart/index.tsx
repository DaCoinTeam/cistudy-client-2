import React, { useContext } from "react"
import { Stars } from "../../../../../../_shared"
import { CourseDetailsContext } from "../../../../_hooks"

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
    } = { ...courseRatings }
    const totalRating =
    numberOf1StarRatings! +
    numberOf2StarRatings! +
    numberOf3StarRatings! +
    numberOf4StarRatings! +
    numberOf5StarRatings!
    console.log("numberOf5StarRatings", numberOf5StarRatings)
    console.log("totalRating", totalRating)
    const caculatePercentage = (rating: number) => {
        return (rating / totalRating) * 100 + "%"
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
                {totalRating} ratings
            </p>
            <div className='flex items-center mt-4'>
                <a
                    href='#'
                    className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
          5 star
                </a>
                <div className='w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700'>
                    <div
                        className='h-5 bg-yellow-300 rounded '
                        style={{
                            width: caculatePercentage(numberOf5StarRatings! / totalRating),
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
                    className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
          4 star
                </a>
                <div className='w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700'>
                    <div
                        className='h-5 bg-yellow-300 rounded'
                        style={{
                            width: caculatePercentage(numberOf4StarRatings! / totalRating),
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
                    className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
          3 star
                </a>
                <div className='w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700'>
                    <div
                        className='h-5 bg-yellow-300 rounded'
                        style={{
                            width: caculatePercentage(numberOf3StarRatings! / totalRating),
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
                    className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
          2 star
                </a>
                <div className='w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700'>
                    <div
                        className='h-5 bg-yellow-300 rounded'
                        style={{
                            width: caculatePercentage(numberOf2StarRatings! / totalRating),
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
                    className='text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
          1 star
                </a>
                <div className='w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700'>
                    <div
                        className='h-5 bg-yellow-300 rounded'
                        style={{
                            width: caculatePercentage(numberOf1StarRatings! / totalRating),
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
