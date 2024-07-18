"use client"
import { useContext } from "react"
import { RootContext } from "../../_hooks"
import { Carousel } from "./Carousel"
import { Spacer } from "@nextui-org/react"

export const Courses = () => {
    const { swrs } = useContext(RootContext)!
    const { highlightSwr } = swrs
    const { data } = highlightSwr
    const {highRatedCourses, recentlyAddedCourses, mostEnrolledCourses} = {...data}
    console.log(data)
    return (
        <div>
            <div className="w-full text-center text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mb-6">Try our courses</div>
            <div className="ms-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">High Rating Courses</div>
            {highRatedCourses && (
                <Carousel  courses={highRatedCourses} />
            )}
            <Spacer y={12}/>
            <div className="ms-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">Best Seller</div>
            {mostEnrolledCourses && (
                <Carousel  courses={mostEnrolledCourses} />

            )}
            <Spacer y={12}/>
            <div className="ms-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">Newest Courses</div>
            {recentlyAddedCourses && (
                <Carousel  courses={recentlyAddedCourses} />

            )}
        </div>
    )
}