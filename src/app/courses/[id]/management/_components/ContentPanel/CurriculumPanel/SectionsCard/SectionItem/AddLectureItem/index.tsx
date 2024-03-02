"use client"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { createLecture } from "@services"
import { isErrorResponse } from "@common"
import { SectionItemContext } from ".."
import { PlusIcon } from "lucide-react"

export const AddLectureItem = () => {
    const { functions, props } = useContext(SectionItemContext)!
    const { section } = props
    const { sectionId } = section

    const { fetchAndSetLectures } = functions

    const onPress = async () => {
        const response = await createLecture({
            data: {
                sectionId,
                title: "Nguyen Van Tu Cuong",
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetLectures()
        } else {
            console.log(response)
        }
    }

    return (
        <Button
            onPress={onPress}
            fullWidth
            startContent={<PlusIcon size={20} strokeWidth={4 / 3} />}
            className="bg-content2 h-12"
        >
      Add Lecture
        </Button>
    )
}
