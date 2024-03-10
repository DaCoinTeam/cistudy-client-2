"use client"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { createLecture } from "@services"
import { SectionItemContext } from ".."
import { PlusIcon } from "lucide-react"

export const AddLectureItem = () => {
    const { swrs, props } = useContext(SectionItemContext)!
    const { lecturesSwr } = swrs
    const { mutate } = lecturesSwr

    const { section } = props
    const { sectionId } = section

    const onPress = async () => {
        await createLecture({
            data: {
                sectionId,
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
            className="bg-content2 h-12"
        >
      Add Lecture
        </Button>
    )
}
