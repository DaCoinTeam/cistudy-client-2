"use client"
import { EmblaOptionsType } from "embla-carousel"
import "./_css/embla.css"

import EmblaCarousel from "./_component"
import { CourseEntity } from "@common"

type CarouselProps = {
    courses: CourseEntity[],
    isBestSeller?: boolean
}
export const Carousel = (props: CarouselProps) => {
    const OPTIONS: EmblaOptionsType = { align: "start" }
    const {courses, isBestSeller} = props
    return (
        <div>
            <EmblaCarousel  slides={courses} isBestSeller={isBestSeller} options={OPTIONS} />
        </div>
    )
}