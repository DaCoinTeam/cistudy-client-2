import React, { createContext, useMemo } from "react"
import { LectureEntity } from "@common"
import { Image } from "@nextui-org/react"
import { ResourcesModal } from "./ResourcesModal"
import { getAssetUrl } from "@services"
import { MoreButton } from "./MoreButton"
import { Clock1 } from "lucide-react"

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

    const LectureItemContextValue: LectureItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
    )

    return (
        <LectureItemContext.Provider value={LectureItemContextValue}>
            <div className="bg-content1 rounded-large p-2">
                <div className="justify-between flex items-center w-full">
                    <div className="flex gap-4 items-center">
                        <Image
                            className="h-12 aspect-video"
                            alt={lectureId}
                            src={getAssetUrl(lecture?.thumbnailId)}
                            fallbackSrc="https://via.placeholder.com/300x200"
                        />
                        <div>
                            <div className="text-sm"> {lecture?.title} </div>
                            <div className="flex items-center gap-1">
                                <Clock1 className="w-3 h-3 text-foreground-500" />
                                <div className="text-xs text-foreground-500">15 min </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ResourcesModal />
                        <MoreButton />
                    </div>
                </div>
            </div>
        </LectureItemContext.Provider>
    )
}
