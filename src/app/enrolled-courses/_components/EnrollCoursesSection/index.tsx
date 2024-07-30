"use client"
import React, { useContext } from "react"
import { EnrolledCoursesSectionContext, EnrolledCoursesSectionProvider } from "./EnrolledCoursesSectionProvider"
import { Spacer } from "@nextui-org/react"
import { CourseCard } from "../../../_shared/components/CourseCard"

interface EnrolledCoursesSectionProps {
    className?: string
}

const WrappedEnrolledCoursesSection = (props: EnrolledCoursesSectionProps) => {
    const { className } = props

    const { swrs } = useContext(EnrolledCoursesSectionContext)!
    const { enrolledCoursesSwr } = swrs
    const { data: enrolledCourses } = enrolledCoursesSwr
    const { results } = {...enrolledCourses}

    return (
        <div className={`${className}`}>
            <div className="text-2xl">
                Enrolled Courses
            </div>
            <Spacer y={4}/>
            <div className="grid grid-cols-4 gap-4">
                {
                    results?.map((course) => (
                        <CourseCard key={course.courseId} course={course} />
                    ))
                }
            </div>
        </div>
    )
}

export const EnrolledCoursesSection = (props: EnrolledCoursesSectionProps) => (
    <EnrolledCoursesSectionProvider>
        <WrappedEnrolledCoursesSection {...props} />
    </EnrolledCoursesSectionProvider>
)