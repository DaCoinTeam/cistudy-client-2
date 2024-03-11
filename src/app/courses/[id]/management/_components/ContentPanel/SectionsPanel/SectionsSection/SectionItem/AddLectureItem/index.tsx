"use client"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { createLecture } from "@services"
import { SectionItemContext } from ".."
import { PlusIcon } from "@heroicons/react/24/outline"

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
            className="w-fit"
            onPress={onPress}
            startContent={<PlusIcon width={20} height={20}/>}
        >
      Add lecture
        </Button>
    )
}
