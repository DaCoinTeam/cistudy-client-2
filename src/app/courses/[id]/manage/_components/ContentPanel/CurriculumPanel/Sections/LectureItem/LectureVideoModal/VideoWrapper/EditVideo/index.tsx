import React, { useContext, useRef } from "react"
import { isErrorResponse } from "@common"
import { updateLecture } from "@services"
import { VideoCameraIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import { LectureItemContext } from "../../../index"

export const EditVideo = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { state, functions } = useContext(LectureItemContext)!
    const { lecture } = state
    const { fetchAndSetLecture } = functions

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return
        
        if (lecture === null) return
        const { lectureId } = lecture

        const response = await updateLecture({
            data: {
                lectureId,
                lectureVideoIndex: 0,
            },
            files: [file],
        })
        
        if (!isErrorResponse(response)) {
            await fetchAndSetLecture()
        } else {
            console.log(response)
        }
    }

    return (
        <>
            <Link as="button" onPress={onPress}>
                <VideoCameraIcon className="w-6 h-6" />
            </Link>
            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
