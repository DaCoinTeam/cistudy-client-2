"use client"
import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../_hooks"
import { Spacer } from "@nextui-org/react"
import { CheckIcon } from "lucide-react"
export const CourseTargets = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { courseTargets } = { ...course }

    return (
        <div>
            <div className='text-2xl font-bold'>What you will learn</div>
            <Spacer y={4} />
            <div className='grid grid-cols-2 gap-4 items-start'>
                {courseTargets?.map(({ courseTargetId, content }) => (
                    <div key={courseTargetId} className='flex flex-row items-start'>
                        <div className='w-5 h-5 mr-2'>
                            <CheckIcon />
                        </div>
                        <div className='text-sm font-semibold'>{content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
