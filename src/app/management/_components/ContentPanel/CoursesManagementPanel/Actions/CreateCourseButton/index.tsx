"use client"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"
import React from "react"
import { createCourse } from "@services"
import { useRouter } from "next/navigation"

export const CreateCourseButton = () => {
    const router = useRouter()

    const onPress = async () => {
        const { courseId } = await createCourse()
        router.push(`/courses/${courseId}/manage`)
    }

    return (
        <Button
            onPress={onPress}
            className="bg-content2"
            startContent={<PlusIcon size={20} strokeWidth={3/2} />}
        >
      Create
        </Button>
    )
}
