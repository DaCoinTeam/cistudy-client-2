import React, { createContext, useMemo } from "react"
import { LectureEntity } from "@common"
import { Card, CardBody, Image } from "@nextui-org/react"
import { ClockIcon } from "@heroicons/react/24/outline"

import { LectureVideoModal } from "./LectureVideoModal"
import { DeleteLectureButton } from "./DeleteLectureButton"
import { ResourcesModal } from "./ResourcesModal"
import { getAssetUrl } from "@services"

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
            <Card shadow="none" className="bg-content1" fullWidth>
                <CardBody>
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
                                    <ClockIcon className="w-3 h-3 text-foreground-500" />
                                    <div className="text-xs text-foreground-500">15 min </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LectureVideoModal />
                            <ResourcesModal />
                            <DeleteLectureButton />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </LectureItemContext.Provider>
    )
}
