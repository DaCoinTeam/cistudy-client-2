import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { createCourseTarget } from "@services"
import { Link } from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { TargetsSectionContext } from "../TargetsSectionProviders"

export const AddTargetItem = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data : course } = courseSwr
    const { courseId } = { ...course } 

    const { swrs: targetsSectionSwrs } = useContext(TargetsSectionContext)!
    const { courseTargetsSwr } = targetsSectionSwrs
    const { mutate } = courseTargetsSwr

    const onPress = async () => {
        if (!courseId) return
        await createCourseTarget({
            data: {
                courseId,
                content: "Write something here",
            },
        })
        await mutate()
    }

    return (
        <Link
            onPress={onPress}
            as="button"
            color="foreground"
            className="flex items-center gap-2 h-10 px-3"
        >
            <PlusIcon height={20} width={20}/>
            <div className="text-sm">Add target</div>
        </Link>
    )
}
