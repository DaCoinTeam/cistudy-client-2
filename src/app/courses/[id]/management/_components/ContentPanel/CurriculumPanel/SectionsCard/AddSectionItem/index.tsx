"use client"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { createSection } from "@services"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { PlusIcon } from "lucide-react"

export const AddSectionItem = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, mutate } = courseSwr

    const onPress = async () => {
        if (!course) return
        const { courseId } = course

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
            className="bg-content2 h-[4.25rem]"
        >
      Add Section
        </Button>
    )
}
