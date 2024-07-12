"use client"
import { EmblaOptionsType } from "embla-carousel"
import "./_css/embla.css"

import EmblaCarousel from "./_component"
import { CourseEntity } from "@common"

type CarouselProps = {
    courses: CourseEntity[]
}
export const Carousel = (props: CarouselProps) => {
    const OPTIONS: EmblaOptionsType = { align: "start" }
    const {courses} = props
    return (
        <div>
            <EmblaCarousel  slides={courses} options={OPTIONS} />
        </div>
    )
}