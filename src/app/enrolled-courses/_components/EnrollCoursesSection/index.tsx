"use client"
import { Link, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { CardListSkeleton } from "../../../_shared"
import { CourseCard } from "./CourseCard"
import { EnrolledCoursesSectionContext, EnrolledCoursesSectionProvider } from "./EnrolledCoursesSectionProvider"

interface EnrolledCoursesSectionProps {
    className?: string
}

const WrappedEnrolledCoursesSection = (props: EnrolledCoursesSectionProps) => {
    const { className } = props

    const { swrs } = useContext(EnrolledCoursesSectionContext)!
    const { enrolledCoursesSwr } = swrs
    const { data: enrolledCourses, isLoading } = enrolledCoursesSwr
    const { results } = {...enrolledCourses}
    const router = useRouter()
    return (
        <div className={`${className}`}>
            <div className="text-2xl">
                Enrolled Courses
            </div>
            <Spacer y={4}/>
            {isLoading || results?.length === 0 ? (
                <div>
                    {isLoading  ? (
                        <div>
                            <CardListSkeleton/>
                        </div>
                    )  : (
                        <div>
                            <div>
                            You have not enrolled in any courses yet.
                            </div>
                            <Link className="text-primary mt-2 cursor-pointer" onPress={() => router.push("/courses")} > Go to courses </Link>
                        </div>
                    
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {
                        results?.map((course) => (
                            <CourseCard key={course.courseId} course={course} />
                        ))
                    }
                </div>
            )}
            
        </div>
    )
}

export const EnrolledCoursesSection = (props: EnrolledCoursesSectionProps) => (
    <EnrolledCoursesSectionProvider>
        <WrappedEnrolledCoursesSection {...props} />
    </EnrolledCoursesSectionProvider>
)