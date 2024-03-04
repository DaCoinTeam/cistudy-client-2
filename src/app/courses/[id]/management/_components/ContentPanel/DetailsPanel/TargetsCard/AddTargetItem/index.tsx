import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { createCourseTarget } from "@services"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"

export const AddTargetItem = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data : course, mutate } = courseSwr

    const onPress = async () => {
        if (!course) return
        const { courseId } = course
        await createCourseTarget({
            data: {
                courseId,
                content: "Write something here",
            },
        })
        await mutate()
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
