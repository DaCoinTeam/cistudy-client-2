"use client"
import React, { useContext } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { CourseDetailsContext } from "../../../_hooks"
import { Spacer } from "@nextui-org/react"
export const CourseTargets = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr

    return (
        <div>
            <div className="text-2xl">What you will learn</div>
            <Spacer y={4} />
            <div className="p-4 border rounded-medium bg-content1">
                <div className="grid grid-cols-2 gap-2">
                    {course?.courseTargets.map((target) => (
                        <div
                            key={target.courseTargetId}
                            className="flex gap-2 items-center"
                        >
                            <CheckIcon height={20} width={20} />
                            <div className="text-sm">{target.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
