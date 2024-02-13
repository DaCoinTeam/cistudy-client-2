import { Spacer, Input, Link, Button } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { updateCourse } from "@services"
import { CourseDetailsContext } from "../../../../_hooks"
import { isErrorResponse } from "@common"
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/solid"
import NextVideo from "next-video"
import { EditVideoModal } from "./EditVideoModal"

export const PreviewVideo = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions

    // const onClick = async () => {
    //     if (!state.finishFetch) return
    //     const { course } = state
    //     const { courseId } = course!
    //     if (isEdited) {
    //         const response = await updateCourse({
    //             data: {
    //                 courseId,
    //                 title: formik.values.title
    //             }
    //         })
    //         if (!isErrorResponse(response)) {
    //             // do message
    //             await fetchAndSetCourse()
    //         } else {
    //             console.log(response)
    //         }
    //     }
    //     setIsEdited(!isEdited)
    // }
    return (
        <div>
            <div className="font-semibold ml-3"> Preview Video </div>
            <Spacer y={1} />
            <NextVideo 
                poster={"https://nextui.org/images/hero-card-complete.jpeg"}
                className="rounded-[14px] overflow-hidden"
                src="https://stream.mux.com/sxY31L6Opl02RWPpm3Gro9XTe7fRHBjs92x93kiB1vpc.m3u8?redundant_streams=true" />
            
            <Spacer y={4} />
            <div className="flex gap-4">
                <EditVideoModal/>
                <Button startContent={<PhotoIcon className="w-6 h-6"/>} > Edit thumbnail </Button>
            </div>
        </div>
    )
}
