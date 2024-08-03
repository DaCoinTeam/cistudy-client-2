import { useContext } from "react"
import {
    CourseReviewsProvider,
} from "./CourseReviewProvider"
import { CourseReviewItem } from "./CourseReviewItem"
import { CourseDetailsContext } from "../../../_hooks"
import { AllCourseReviewsModal } from "./AllCourseReviewsModal"
import { Spacer } from "@nextui-org/react"
import { ReviewInput } from "./ReviewInput"
import { Stars } from "../../../../../_shared"

const WrappedCourseReview = () => {
    const { swrs: courseDetailSwrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = courseDetailSwrs
    const { data: course } = courseSwr
    const { enrolled, courseRatings, isCreator, isReviewed, courseReviews } = { ...course }
    const {overallCourseRating,
        totalNumberOfRatings
    } = { ...courseRatings }

    return (
        <div>
            <div className='text-2xl font-bold'>Reviews</div>
            <Spacer y={4} />
            <div className='flex items-end text-center mb-2'>
                <Stars initialValue={overallCourseRating} className='mb-1 mr-2' readonly />
                <p className='ms-1  text-sm lg:text-base font-medium text-gray-800 dark:text-gray-400'>
                    {overallCourseRating?.toFixed(2)}
                </p>
                <p className='ms-1 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-400'>
          out of
                </p>
                <p className='ms-1 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-400'>
          5
                </p>
            </div>
            <p className='text-sm lg:text-base font-medium text-gray-800 dark:text-gray-400'>
                {totalNumberOfRatings} ratings
            </p>
            <Spacer y={2} />
            {enrolled && isCreator === false && !isReviewed && <ReviewInput />}
            <div className="text-primary">{isReviewed ? "You have already leaven a review." : null}</div>
            <Spacer y={6} />
            <div className='space-y-4'>
                {(courseReviews ?? []).map((courseReview) => {
                    return (
                        <div key={courseReview.courseReviewId}>
                            <CourseReviewItem review={courseReview} />
                        </div>
                    )
                })}
            </div>
            <Spacer y={6} />
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
