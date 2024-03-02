import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { createCourseTarget } from "@services"
import { isErrorResponse } from "@common"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"

export const AddTargetItem = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const onPress = async () => {
        if (course === null) return
        const { courseId } = course
        const response = await createCourseTarget({
            data: {
                courseId,
                content: "Write something here",
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    return (
        <Button
            onClick={onPress}
            className="bg-content2"
            startContent={<PlusIcon className="w-4 h-4"/>}
        >
            Add Target
        </Button>
    )
}
