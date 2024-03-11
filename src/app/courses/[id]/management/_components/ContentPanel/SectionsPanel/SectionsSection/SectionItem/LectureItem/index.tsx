import React, { createContext, useMemo } from "react"
import { LectureEntity } from "@common"
import { getAssetUrl } from "@services"
import { MoreButton } from "./MoreButton"
import { InteractiveThumbnail } from "../../../../../../../../../_shared"
import { useRouter } from "next/navigation"
import { ClockIcon } from "@heroicons/react/24/outline"
import { Spacer } from "@nextui-org/react"

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
    const { lectureId, description, title, thumbnailId } = lecture

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
                <div className="grid grid-cols-6 gap-3 w-full">
                    <InteractiveThumbnail src={getAssetUrl(thumbnailId)} onPress={onPress}/>
                    <div className="col-span-3">
                        <div> {title} </div>
                        <div className="flex items-center gap-1">
                            <ClockIcon height={12} width={12} className="text-foreground-500" />
                            <div className="text-xs text-foreground-500">15 min </div>
                        </div>
                        <Spacer y={0.5}/>
                        <div className="text-foreground-500 text-sm line-clamp-2">
                            {description}
                        </div>
                    </div>
                </div>
                <MoreButton />
            </div>
        </LectureItemContext.Provider>
    )
}
