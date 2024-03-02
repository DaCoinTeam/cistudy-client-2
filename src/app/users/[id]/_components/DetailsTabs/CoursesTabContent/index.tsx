import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    CoursesTabContentContext,
    CoursesTabContentProviders,
} from "./CoursesTabContentProviders"
import { CourseCard } from "./CourseCard"
import { Actions } from "./Actions"

const WrappedCoursesTabContent = () => {
    const { state } = useContext(CoursesTabContentContext)!
    const { courses } = state

    const renderCourses = () => (
        <div className="grid grid-cols-3 gap-6">
            {courses.map((courses) => (
                <CourseCard key={courses.courseId} course={courses} />
            ))}
        </div>
    )

    return (
        <Card shadow="none" className="border border-divider">
            <CardHeader className="p-6 pb-2 justify-between flex items-center"> 
                <div className="text-xl font-semibold"> Courses </div>
                <Actions />
            </CardHeader>
            <CardBody className="p-6">{renderCourses()}</CardBody>
        </Card>
    )
}

export const CoursesTabContent = () => {
    return (
        <CoursesTabContentProviders>
            <WrappedCoursesTabContent />
        </CoursesTabContentProviders>
    )
}
