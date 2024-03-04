import React, { createContext, useMemo } from "react"
import { LectureEntity } from "@common"
import { getAssetUrl } from "@services"
import { Clock1 } from "lucide-react"
import { MoreButton } from "./MoreButton"
import { VideoThumbnail } from "../../../../../../../../../_shared"
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
    const { lectureId } = lecture

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
                <div className="grid grid-cols-6 gap-2 items-center w-full">
                    <VideoThumbnail src={getAssetUrl(lecture?.thumbnailId)} onPress={onPress}/>
                    <div className="col-span-5">
                        <div className="text-sm"> {lecture?.title} </div>
                        <div className="flex items-center gap-1">
                            <Clock1 className="w-3 h-3 text-foreground-500" />
                            <div className="text-xs text-foreground-500">15 min </div>
                        </div>
                    </div>
                </div>
                <MoreButton />
            </div>
        </LectureItemContext.Provider>
    )
}
