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
    const { data: createdCoures } = createdCoursesSwr

    return (
        <Card shadow="none" className="border border-divider">
            <CardHeader className="p-4 pb-2  justify-between flex items-center"> 
                <div className="text-2xl font-bold"> Courses </div>
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
        <CoursesTabContentProviders>
            <WrappedCoursesTabContent />
        </CoursesTabContentProviders>
    )
}
