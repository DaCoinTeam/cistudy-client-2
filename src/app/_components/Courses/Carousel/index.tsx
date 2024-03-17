"use client"
import { EmblaOptionsType } from "embla-carousel"
import "./_css/embla.css"
import EmblaCarousel from "./_component"
import { CourseInterface } from ".."

type CarouselProps = {
    courses: CourseInterface[]
}
export const Carousel = (props: CarouselProps) => {
    const OPTIONS: EmblaOptionsType = { align: "start" }
    const {courses} = props
    console.log("courses",courses)
    return (
        <div>
            <EmblaCarousel slides={courses} options={OPTIONS} />
        </div>
    )
}