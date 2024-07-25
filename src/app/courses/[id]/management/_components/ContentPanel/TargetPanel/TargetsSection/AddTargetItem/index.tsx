import React, { useContext } from "react"
import { createCourseTarget } from "@services"
import { Link } from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { TargetsSectionContext } from "../TargetsSectionProvider"
import { ManagementContext } from "../../../../../_hooks"

export const AddTargetItem = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr
    const { courseId } = { ...courseManagement } 

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
            className="h-[52px] w-full grid place-content-center"
        >   
            <div className="flex gap-1 items-center">
                <PlusIcon height={20} width={20}/>
                <div className="text-sm">Add target</div>
            </div>
        </Link>
    )
}
