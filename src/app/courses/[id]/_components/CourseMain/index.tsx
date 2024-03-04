import React from "react"
import Rating from "../Rating"
import { Divider } from "@nextui-org/react"
import CourseContent from "./_component/CourseContent"
import Instructor from "./_component/Instructor"
import Reviews from "./_component/Reviews"
import CourseTarget from "./_component/CourseTarget"
export const CourseMain = () => {
    return (
        <div>

            <div className='py-2'>
                <CourseTarget />
            </div>
            <div className='py-2'>
                <CourseContent />
            </div>
            <div className='py-2'>
                <Instructor />
            </div>
            <div className='py-2'>
                <h2 className="text-2xl font-extrabold dark:text-white py-2">Reviews</h2>

                <Rating isHeading={true} />
                <Divider className='my-4' />
                <Reviews />
            </div>
        </div>
    )
}
