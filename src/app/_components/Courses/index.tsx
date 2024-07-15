"use client"
import { useContext } from "react"
import { CourseEntity } from "../../../common/types"
import { Carousel } from "./Carousel"
import { AllCoursesContext } from "../../courses/_hooks"

export const Courses = () => {
    const { swrs } = useContext(AllCoursesContext)!
    const { coursesSwr } = swrs
    const { data } = coursesSwr
    const getCourses = (start : number, end : number) => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { metadata } = element
            coursesReturn.push(...metadata.highRateCourses)
        })
        return coursesReturn.slice(start, end)
    }
    return (
        <div>
            <div className="ms-8 text-2xl font-semibold "> High Rating Courses</div>
            <Carousel  courses={getCourses(0, 20)} />
        </div>
    )
}