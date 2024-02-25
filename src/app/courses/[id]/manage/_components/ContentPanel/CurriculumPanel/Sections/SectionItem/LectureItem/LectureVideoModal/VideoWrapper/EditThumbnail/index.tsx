import React, { useContext, useRef } from "react"
import { isErrorResponse } from "@common"
import { updateLecture } from "@services"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import { LectureItemContext } from "../../../index"
import { SectionItemContext } from "../../../../index"

export const EditThumbnail = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const { functions } = useContext(SectionItemContext)!
    const { fetchAndSetLectures } = functions

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        const response = await updateLecture({
            data: {
                lectureId,
                thumbnailIndex: 0,
            },
            files: [file],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLectures()
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
