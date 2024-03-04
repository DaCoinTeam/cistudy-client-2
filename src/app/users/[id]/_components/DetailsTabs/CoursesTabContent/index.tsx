import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    CoursesTabContentContext,
    CoursesTabContentProviders,
} from "./CoursesTabContentProviders"
import { CourseCard } from "./CourseCard"
import { Actions } from "./Actions"

const WrappedCoursesTabContent = () => {
    const { swrs } = useContext(CoursesTabContentContext)!
    const { createdCoursesSwr } = swrs
    const { data: createdCoures} = createdCoursesSwr

    const renderCourses = () => (
        <div className="grid grid-cols-3 gap-6">
            {createdCoures?.map((course) => (
                <CourseCard key={course.courseId} course={course} />
            ))}
        </div>
    )

    return (
        <Card shadow="none">
            <CardHeader className="p-4 pb-2 leading-none justify-between flex items-center"> 
                <div className="text-2xl font-bold"> Courses </div>
                <Actions />
            </CardHeader>
            <CardBody className="p-4">{renderCourses()}</CardBody>
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
