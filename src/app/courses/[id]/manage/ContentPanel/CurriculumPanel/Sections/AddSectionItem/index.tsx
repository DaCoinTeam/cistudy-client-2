"use client"
import { PlusIcon } from "@heroicons/react/16/solid"
import { Button, } from "@nextui-org/react"
import React, { useContext } from "react"
import { createSection } from "@services"
import { CourseDetailsContext } from "../../../../../_hooks"
import { isErrorResponse } from "@common"

export const AddSectionItem = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions
    const { course } = state

    const onPress = async () => {
        if (course === null) return
        const { courseId } = course
        if (!courseId) return
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
        <Button onPress={onPress} fullWidth className="bg-content2 h-[4.5rem]">
            <PlusIcon className="w-6 h-6" />
        </Button>
    )
}
