"use client"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { createSection } from "@services"
import { ManagementContext } from "../../../../../_hooks"
import { PlusIcon } from "@heroicons/react/24/outline"

export const AddSectionItem = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr
    const { courseId } = { ...courseManagement }

    const onPress = async () => {
        if (!courseId) return
        await createSection({
            data: {
                courseId,
                title: "Nguyen Van Tu Cuong",
            },
        })
        await mutate()
    }

    return (
        <Link as={"button"} onPress={onPress} color="foreground" className="h-20 w-full !bg-transparent px-4 grid place-content-center">
            <div className="items-center flex gap-2">
                <PlusIcon width={20} height={20} />
                <div className="text-sm">Add section</div>
            </div>
        </Link>
    )
}
