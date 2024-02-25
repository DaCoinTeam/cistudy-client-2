import { TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { deleteLecture } from "@services"
import { isErrorResponse } from "@common"
import { LectureItemContext } from "../index"

export const DeleteLectureButton = () => {
    const { state, functions } = useContext(LectureItemContext)!
    const { lecture } = state
    const { fetchAndSetLecture } = functions

    const onPress = async () => {
        if (lecture === null) return 
        const { lectureId } = lecture

        const response = await deleteLecture({
            data: {
                lectureId
            }
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLecture()
        } else {
            console.log(response)
        }
    }

    return (
        <Link as="button" color="danger" onPress={onPress}>
            <TrashIcon className="w-6 h-6"/>
        </Link>
    )
}