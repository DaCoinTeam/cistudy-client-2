"use client"
import { PlusIcon } from "@heroicons/react/16/solid"
import { Button, } from "@nextui-org/react"
import React, { useContext } from "react"
import { createLecture } from "@services"
import { isErrorResponse } from "@common"
import { SectionItemContext } from ".."

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
        <Button onPress={onPress} fullWidth className="bg-content1 h-[4.25rem]">
            <PlusIcon className="w-6 h-6" />
        </Button>
    )
}
