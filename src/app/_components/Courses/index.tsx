"use client"
import { Spacer } from "@nextui-org/react"
import { Carousel } from "./Carousel"
import { RootContext } from "../../_hooks"
import { useContext } from "react"
import { CourseEntity } from "../../../common/types"

export const Courses = () => {
    const { swrs } = useContext(RootContext)!
    const { coursesSwr } = swrs
    const { data } = coursesSwr
    const getCourses = (start : number, end : number) => {
        if (!data) return []
        const coursesReturn: Array<CourseEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            coursesReturn.push(...results)
        })
        return coursesReturn.slice(start, end)
    }
    return (
        <div>
            <div className="ms-8 text-2xl font-semibold "> Featured Courses</div>
            <Carousel  courses={getCourses(0,9)} />
            <Spacer y={8} />
            <div className="ms-8 text-2xl font-semibold "> High Rating Courses</div>
            <Carousel  courses={getCourses(7,14)} />
        </div>
    )
}