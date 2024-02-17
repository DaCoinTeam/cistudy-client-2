import { PlusIcon } from "@heroicons/react/16/solid"
import { Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { createCourseTarget } from "@services"
import { isErrorResponse } from "@common"
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
        <Card
            onPress={onPress}
            shadow="none"
            className="bg-content2"
            isPressable
            fullWidth
        >
            <CardBody className="grid place-items-center py-2.5">
                <PlusIcon className="w-6 h-6" />
            </CardBody>
        </Card>
    )
}