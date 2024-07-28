import React from "react"
import { Spacer } from "@nextui-org/react"
import { Sections } from "./Sections"
import { Instructor } from "./Instructor"
import { CourseTargets } from "./CourseTargets"
import { CourseReview } from "./CourseReview"
export const CourseMain = () => {
    return (
        <div className='max-w-[1920px] mx-auto w-full px-6 md:px-12 lg:px-16'>
            <div className='w-full lg:w-2/3'>
                <CourseTargets />
                <Spacer y={12} />
                <Sections />
                <Spacer y={12} />
                <Instructor />
                <Spacer y={12} />
                <CourseReview />
               
            </div>
        </div>
    )
}
