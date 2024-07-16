"use client"
import { useContext } from "react"
import { RootContext } from "../../_hooks"
import { Carousel } from "./Carousel"
import { Spacer } from "@nextui-org/react"

export const Courses = () => {
    const { swrs } = useContext(RootContext)!
    const { highlightSwr } = swrs
    const { data } = highlightSwr
    const {highRatedCourses, recentlyAddedCourses} = {...data}

    return (
        <div>
            <div className="ms-8 text-2xl font-semibold "> High Rating Courses</div>
            {highRatedCourses && (
                <Carousel  courses={highRatedCourses} />
            )}
            <Spacer y={4}/>
            <div className="ms-8 text-2xl font-semibold "> High Rating Courses</div>
            {recentlyAddedCourses && (
                <Carousel  courses={recentlyAddedCourses} />

            )}
        </div>
    )
}