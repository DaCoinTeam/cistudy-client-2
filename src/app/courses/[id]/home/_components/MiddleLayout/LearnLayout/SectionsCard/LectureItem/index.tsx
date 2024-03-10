import React from "react"
import { LectureEntity } from "@common"
import { InteractiveThumbnail } from "../../../../../../../../_shared"
import { getAssetUrl } from "@services"
import { ClockIcon } from "lucide-react"

interface LectureItemProps {
  lecture: LectureEntity;
}

export const LectureItem = (props: LectureItemProps) => {
    const { lecture } = props
    const { lectureId, title, thumbnailId } = lecture

    const onPress = () =>  window.open(`/lectures/${lectureId}`)

    return (
        <div
            className="grid gap-2 grid-cols-6 p-0 items-center z-10"
        >
            <InteractiveThumbnail
                size={40}
                src={getAssetUrl(thumbnailId)}
                onPress={onPress}
                className="col-span-1"
            />
            <div className="col-span-5">
                <div>
                    <div className="truncate text-sm"> {title} </div>
                    <div className="flex gap-1 items-center text-foreground-500">
                        <ClockIcon strokeWidth={3 / 2} size={12} />
                        <div className="text-xs">15m</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
