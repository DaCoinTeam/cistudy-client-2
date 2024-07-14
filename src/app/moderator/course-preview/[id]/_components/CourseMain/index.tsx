import React from "react"
import { Spacer } from "@nextui-org/react"
import { Sections } from "./Sections"
import { CourseTargets } from "./CourseTargets"
export const CourseMain = () => {
    return (
        <div className="max-w-[1920px] mx-auto w-full px-12">
            <div className="w-2/3">
                <CourseTargets />
                <Spacer y={12} />
                <Sections />
            </div>
        </div>
    )
}
