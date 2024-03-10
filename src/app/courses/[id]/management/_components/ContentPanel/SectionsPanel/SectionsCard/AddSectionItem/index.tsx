"use client"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { createSection } from "@services"
import { PlusIcon } from "lucide-react"
import { ManagementContext } from "../../../../../_hooks"

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
        <Button
            onPress={onPress}
            fullWidth
            startContent={<PlusIcon size={20} strokeWidth={3/2} />}
            className="h-[4.5rem] !bg-transparent"
        >
      Add Section
        </Button>
    )
}
