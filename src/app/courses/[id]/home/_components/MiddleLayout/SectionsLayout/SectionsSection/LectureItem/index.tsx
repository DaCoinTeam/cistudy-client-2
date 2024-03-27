import React from "react"
import { LectureEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"

interface LectureItemProps {
  lecture: LectureEntity;
}

export const LectureItem = (props: LectureItemProps) => {
    const { lecture } = props
    const { lectureId, title, thumbnailId, description } = lecture

    const onPress = () =>  window.open(`/lectures/${lectureId}`)

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
                    <div className="truncate text-sm"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-400">
                        <div className="text-xs text-foreground-400">15m</div>
                        <div className="text-xs text-foreground-400">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
