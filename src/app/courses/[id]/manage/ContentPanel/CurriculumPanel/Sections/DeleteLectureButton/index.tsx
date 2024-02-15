import { TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { deleteLecture } from "@services"
import { isErrorResponse } from "@common"
import { CourseDetailsContext } from "../../../../../_hooks"
interface DeleteLectureButtonProps {
    lectureId: string
}

export const DeleteLectureButton = (props: DeleteLectureButtonProps) => {
    const { functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions

    const onPress = async () => {
        const response = await deleteLecture({
            data: {
                lectureId: props.lectureId
            }
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
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