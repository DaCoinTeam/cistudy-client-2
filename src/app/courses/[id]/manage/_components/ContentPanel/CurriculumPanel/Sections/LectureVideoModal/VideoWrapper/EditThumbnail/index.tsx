import React, { useContext, useRef } from "react"
import { isErrorResponse } from "@common"
import { updateLecture } from "@services"
import { CourseDetailsContext } from "../../../../../../../../_hooks"
import { LectureVideoModalPropsContext } from "../../index"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"

export const EditThumbnail = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { lecture } = useContext(LectureVideoModalPropsContext)!
    const { lectureId } = lecture

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return
        const courseId = course?.courseId
        if (!courseId) return

        const response = await updateLecture({
            data: {
                lectureId,
                thumbnailIndex: 0,
            },
            files: [file],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    return (
        <>
            <Link as="button" onPress={onPress}>
                <PhotoIcon className="w-6 h-6" />
            </Link>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
