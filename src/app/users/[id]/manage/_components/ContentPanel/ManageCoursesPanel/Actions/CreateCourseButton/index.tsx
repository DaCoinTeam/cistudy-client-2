"use client"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"
import React from "react"
import { createCourse } from "@services"
import { isErrorResponse } from "@common"
import { useRouter } from "next/navigation"

export const CreateCourseButton = () => {
    const router = useRouter()

    const onPress = async () => {
        const response = await createCourse()
        if (!isErrorResponse(response)) {
            router.push(`/courses/${response.courseId}/manage`)
        } else {
            console.log(response)
        }
    }

    return (
        <Button
            onPress={onPress}
            className="bg-content2"
            startContent={<PlusIcon size={20} strokeWidth={4 / 3} />}
        >
      Create
        </Button>
    )
}
