import React from "react"
import { LessonEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"

interface LessonItemProps {
  lesson: LessonEntity;
}

export const LessonItem = (props: LessonItemProps) => {
    const { lesson } = props
    const { lessonId, title, thumbnailId, description } = lesson

    const onPress = () =>  window.open(`/lessons/${lessonId}`)

    return (
        <div
            className="flex gap-3 z-10"
        >
            <InteractiveThumbnail
                isPressable
                src={getAssetUrl(thumbnailId)}
                onPress={onPress}
                className="h-fit w-40"
            />
            <div>
                <div>
                    <div className="truncate text-sm text-primary font-bold"> {title} </div>
                    <div className="flex flex-col gap-1 text-foreground-400">
                        <div className="text-xs text-foreground-400 font-semibold">15m</div>
                        <div className="text-xs text-foreground-400 font-semibold line-clamp-3">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
