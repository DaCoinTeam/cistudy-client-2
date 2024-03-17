import React, { createContext, useMemo } from "react"
import { LectureEntity } from "@common"
import { getAssetUrl } from "@services"
import { MoreButton } from "./MoreButton"
import { InteractiveThumbnail } from "../../../../../../../../../_shared"
import { useRouter } from "next/navigation"

interface LectureItemProps {
  lecture: LectureEntity;
}

interface LectureItemContextValue {
  props: LectureItemProps;
}

export const LectureItemContext = createContext<LectureItemContextValue | null>(
    null
)

export const LectureItem = (props: LectureItemProps) => {
    const { lecture } = props
    const { lectureId, title, thumbnailId, description } = lecture

    const lectureItemContextValue: LectureItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
    )

    const router = useRouter()

    const onPress = () => router.push(`/lectures/${lectureId}`)

    return (
        <LectureItemContext.Provider value={lectureItemContextValue}>
            <div className="justify-between flex items-center w-full">
                <div className="flex gap-3 w-full">
                    <InteractiveThumbnail className="w-40 h-fit" src={getAssetUrl(thumbnailId)} onPress={onPress}/>
                    <div>
                        <div> {title} </div>
                        <div className="text-xs text-foreground-500">15 min </div>
                        <div className="text-xs text-foreground-500"> {description} </div>
                    </div>
                </div>
                <MoreButton />
            </div>
        </LectureItemContext.Provider>
    )
}
