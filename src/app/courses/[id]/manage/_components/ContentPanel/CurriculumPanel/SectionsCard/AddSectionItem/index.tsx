"use client"
import { Button, } from "@nextui-org/react"
import React, { useContext } from "react"
import { createSection } from "@services"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { isErrorResponse } from "@common"
import { PlusIcon } from "lucide-react"

export const AddSectionItem = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions
    const { course } = state

    const onPress = async () => {
        if (course === null) return
        const { courseId } = course

        const response = await createSection({
            data: {
                courseId,
                title: "Nguyen Van Tu Cuong",
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    return (
        <Button onPress={onPress} fullWidth startContent={<PlusIcon size={14}/>} className="bg-content2 h-[4.25rem]">
            Add Section
        </Button>
    )
}
