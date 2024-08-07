import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    CoursesTabContentContext,
    CoursesTabContentProvider,
} from "./CoursesTabContentProvider"
import { CourseCard } from "./CourseCard"
import { Actions } from "./Actions"

const WrappedCoursesTabContent = () => {
    const { swrs } = useContext(CoursesTabContentContext)!
    const { createdCoursesSwr } = swrs
    const { data: createdCoures } = createdCoursesSwr

    return (
        <Card shadow="none" className="border border-divider">
            <CardHeader className="p-4 pb-2 justify-between flex items-center"> 
                <div className="text-xl font-semibold"> Courses </div>
                <Actions />
            </CardHeader>
            <CardBody className="p-4 grid grid-cols-3 gap-6">
                {createdCoures?.map((course) => (
                    <CourseCard key={course.courseId} course={course} />
                ))}
            </CardBody>
        </Card>
    )
}

export const CoursesTabContent = () => {
    return (
        <CoursesTabContentProvider>
            <WrappedCoursesTabContent />
        </CoursesTabContentProvider>
    )
}
