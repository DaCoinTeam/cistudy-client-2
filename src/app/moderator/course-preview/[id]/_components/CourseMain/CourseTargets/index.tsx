"use client"
import React, { useContext } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { CoursePreviewContext } from "../../../_hooks"
import { Spacer } from "@nextui-org/react"
export const CourseTargets = () => {
    const { swrs } = useContext(CoursePreviewContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { courseTargets } = { ...course }


    return (
        <div>
            <div className="text-2xl font-bold">What you will learn</div>
            <Spacer y={4} />
            <div className="grid grid-cols-2 gap-4 items-start p-4 border border-divider rounded-medium">
                {courseTargets?.map(({ courseTargetId, content }) => (
                    <div key={courseTargetId} className="flex flex-row items-start">
                        <div className="mr-3">
                            <CheckIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-sm font-semibold">{content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
