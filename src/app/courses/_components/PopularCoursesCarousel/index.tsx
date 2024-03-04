"use client"
import React, { useContext } from "react"
import { PopularCoursesCarouselContext, PopularCoursesCarouselProviders } from "./PopularCoursesCarouselProviders"

export const WrappedPopularCoursesCarousel = () => {
    const { state } = useContext(PopularCoursesCarouselContext)!
    const { courses, finishFetch } = state
    console.log(state)
    return (
        <div>
            {
                finishFetch ? JSON.stringify(courses) : "skeletinggggg"
            }
        </div>
    )
}

export const PopularCoursesCarousel = () => (
    <PopularCoursesCarouselProviders>
        <WrappedPopularCoursesCarousel/>
    </PopularCoursesCarouselProviders>
)