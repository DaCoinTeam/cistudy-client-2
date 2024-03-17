import React from "react"
import { Stars } from "../../../../_shared"
import { Spacer } from "@nextui-org/react"
import { Sections } from "./Sections"
import { Instructor } from "./Instructor"
import { Reviews } from "./Reviews"
import { CourseTargets } from "./CourseTargets"
export const CourseMain = () => {
    return (
        <div className="max-w-[1920px] mx-auto w-full px-12">
            <div className="w-2/3">
                <CourseTargets />
                <Spacer y={12} />
                <Sections />
                <Spacer y={12} />
                <Instructor />
                <Spacer y={12} />
                <div className="py-2">
                    <div className="text-2xl">
            Reviews
                    </div>
                    <Stars />
                    <Spacer y={4} />
                    <Reviews />
                </div>
            </div>
        </div>
    )
}
