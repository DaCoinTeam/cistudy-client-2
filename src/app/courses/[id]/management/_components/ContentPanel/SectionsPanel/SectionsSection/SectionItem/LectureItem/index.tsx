import React, { createContext, useMemo } from "react"
import { LessonEntity } from "@common"
import { getAssetUrl } from "@services"
import { MoreButton } from "./MoreButton"
import { InteractiveThumbnail } from "../../../../../../../../../_shared"
import { useRouter } from "next/navigation"

interface LessonItemProps {
  lesson: LessonEntity;
}

interface LessonItemContextValue {
  props: LessonItemProps;
}

export const LessonItemContext = createContext<LessonItemContextValue | null>(
    null
)

export const LessonItem = (props: LessonItemProps) => {
    const { lesson } = props
    const { lessonId, title, thumbnailId, description } = lesson

    const lessonItemContextValue: LessonItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
    )

    const router = useRouter()

    const onPress = () => router.push(`/lessons/${lessonId}`)

    return (
        <LessonItemContext.Provider value={lessonItemContextValue}>
            <div className="justify-between flex items-center w-full">
                <div className="flex gap-3 w-full">
                    <InteractiveThumbnail isPressable className="w-40 h-fit" src={getAssetUrl(thumbnailId)} onPress={onPress}/>
                    <div>
                        <div> {title} </div>
                        <div className="text-xs text-foreground-400">15 min </div>
                        <div className="text-xs text-foreground-400"> {description} </div>
                    </div>
                </div>
                <MoreButton />
            </div>
        </LessonItemContext.Provider>
    )
}
