import { TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { deleteLecture } from "@services"
import { isErrorResponse } from "@common"
import { LectureItemContext } from "../index"
import { SectionItemContext } from "../../index"

export const DeleteLectureButton = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const { functions } = useContext(SectionItemContext)!
    const { fetchAndSetLectures } = functions

    const onPress = async () => {
        const response = await deleteLecture({
            data: {
                lectureId
            }
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLectures()
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