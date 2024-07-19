import { CourseReviewEntity } from "@common"
import { useContext } from "react"
import {
    CourseReviewsContext,
    CourseReviewsProvider,
} from "./CourseReviewProvider"
import { CourseReviewItem } from "./CourseReviewItem"
import { CourseDetailsContext } from "../../../_hooks"
import { AllCourseReviewsModal } from "./AllCourseReviewsModal"
import { Spacer } from "@nextui-org/react"
import { ReviewInput } from "./ReviewInput"
import { Stars } from "../../../../../_shared"

const WrappedCourseReview = () => {
    const { swrs } = useContext(CourseReviewsContext)!
    const { data } = swrs.courseReviewsSwr
    const { swrs: courseDetailSwrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = courseDetailSwrs
    const { data: course } = courseSwr
    const { enrolled, courseRatings, isCreator } = { ...course }
    const {overallCourseRating,
        totalNumberOfRatings
    } = { ...courseRatings }

    const getReviews = () => {
        if (!data) return []
        const reviewsReturn: Array<CourseReviewEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            reviewsReturn.push(...results)
        })
        return reviewsReturn
    }

    return (
        <div>
            <div className='text-2xl font-bold'>Reviews</div>
            <Spacer y={4} />

            <div className='flex items-end text-center mb-2'>
                <Stars initialValue={overallCourseRating} className='mr-2' readonly />
                <p className='ms-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {overallCourseRating?.toFixed(2)}
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
            <Spacer y={2} />
            {enrolled && isCreator === false && <ReviewInput />}

            <div className='grid grid-cols-2 gap-4'>
                {getReviews()?.map((item) => {
                    return (
                        <div key={item.courseReviewId}>
                            <CourseReviewItem review={item} />
                        </div>
                    )
                })}
            </div>
            <Spacer y={4} />
            <AllCourseReviewsModal />
        </div>
    )
}

export const CourseReview = () => {
    return (
        <CourseReviewsProvider>
            <WrappedCourseReview />
        </CourseReviewsProvider>
    )
}
