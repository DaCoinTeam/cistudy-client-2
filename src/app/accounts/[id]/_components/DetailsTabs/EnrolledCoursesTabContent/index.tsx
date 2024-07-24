"use client"
import React, { useContext } from "react"
import { EnrolledCoursesTabContentContext, EnrolledCoursesTabContentProvider } from "./EnrolledCoursesTabProvider"
import { CourseCard } from "../../../../../_shared/components/CourseCard"

interface EnrolledCoursesTabContentProps {
    className?: string
}

const WrappedEnrolledCoursesTabContent = (props: EnrolledCoursesTabContentProps) => {
    const { className } = props

    const { swrs } = useContext(EnrolledCoursesTabContentContext)!
    const { enrolledCoursesSwr } = swrs
    const { data: enrolledCourses } = enrolledCoursesSwr
    const { results } = {...enrolledCourses}

    return (
        <div className={`${className}`}>
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

export const EnrolledCoursesTabContent = (props: EnrolledCoursesTabContentProps) => (
    <EnrolledCoursesTabContentProvider>
        <WrappedEnrolledCoursesTabContent {...props} />
    </EnrolledCoursesTabContentProvider>
)