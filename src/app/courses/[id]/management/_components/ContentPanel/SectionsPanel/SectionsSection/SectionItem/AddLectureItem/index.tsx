"use client"
import { Link } from "@nextui-org/react"
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
        <Link
            as="button"
            className="w-full grid place-content-center h-10"
            onPress={onPress}
            color="foreground"
        >
            <div className="gap-2 flex">
                <PlusIcon width={20} height={20}/>
                <div className="text-sm">Add lecture </div>
            </div>
    
        </Link>
    )
}
