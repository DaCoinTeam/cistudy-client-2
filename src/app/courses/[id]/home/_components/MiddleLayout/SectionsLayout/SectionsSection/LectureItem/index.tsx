import React from "react"
import { LectureEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { ClockIcon } from "@heroicons/react/24/outline"

interface LectureItemProps {
  lecture: LectureEntity;
}

export const LectureItem = (props: LectureItemProps) => {
    const { lecture } = props
    const { lectureId, title, thumbnailId } = lecture

    const onPress = () =>  window.open(`/lectures/${lectureId}`)

    return (
        <div
            className="flex gap-3 z-10"
        >
            <InteractiveThumbnail
                src={getAssetUrl(thumbnailId)}
                onPress={onPress}
                className="h-fit w-40"
            />
            <div>
                <div>
                    <div className="truncate text-sm"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-500">
                        <ClockIcon height={12} width={12} />
                        <div className="text-xs">15m</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
