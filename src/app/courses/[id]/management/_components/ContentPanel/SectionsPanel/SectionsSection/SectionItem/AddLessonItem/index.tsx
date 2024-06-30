"use client"
import { Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { createLesson } from "@services"
import { SectionItemContext } from ".."
import { PlusIcon } from "@heroicons/react/24/outline"

export const AddLessonItem = () => {
    const { swrs, props } = useContext(SectionItemContext)!
    const { lessonsSwr } = swrs
    const { mutate } = lessonsSwr

    const { section } = props
    const { sectionId } = section

    const onPress = async () => {
        await createLesson({
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
                <div className="text-sm">Add lesson </div>
            </div>
    
        </Link>
    )
}
