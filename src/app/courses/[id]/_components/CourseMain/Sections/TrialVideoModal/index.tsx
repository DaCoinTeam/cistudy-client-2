import React from "react"
import { LessonEntity, SectionContentEntity, VideoType, parseDuration } from "@common"
import { Card, CardBody, Chip, Modal, ModalBody, ModalContent, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react"
import { VideoIcon, Clock2Icon, AirplayIcon, FlaskConicalIcon } from "lucide-react"
import { VideoPlayer } from "../../../../../../_shared"
import { getAssetManifestUrl, getAssetUrl } from "@services"

export interface TrialVideoModalProps {
    lesson: LessonEntity
    sectionContent: SectionContentEntity
}
export const TrialVideoModal = ({ lesson, sectionContent } : TrialVideoModalProps) => {
    const { onOpenChange, onOpen, isOpen } = useDisclosure()

    const renderLession = () => {
        return (
            <Card shadow="none" onPress={lesson.isTrial ? onOpen : undefined} isPressable={lesson.isTrial}>
                <CardBody className="p-0">
                    <div className="flex gap-3">
                        <div>
                            <VideoIcon
                                className="w-6 h-6 text-foreground-400"
                                strokeWidth={3 / 2}
                            />
                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <div>
                                    <span className="font-semibold">{sectionContent.position}. Lesson: </span>
                                    <span>{sectionContent.title}</span>
                                </div>
                            </div>
                            <div className="text-xs text-foreground-400 line-clamp-1">
                                {lesson.description}
                            </div>
                            <Spacer y={1} />
                            <div className="flex gap-2">
                                <Chip
                                    classNames={{
                                        base: "gap-1 px-2",
                                    }}
                                    size="sm"
                                    color="default"
                                    variant="flat"
                                    startContent={
                                        <Clock2Icon className="w-3 h-3" strokeWidth={3 / 2} />
                                    }
                                >
                                    {parseDuration(lesson.durationInSeconds ?? 0)}
                                </Chip>
                                {lesson.videoType === VideoType.DASH ? (
                                    <Chip
                                        variant="flat"
                                        size="sm"
                                        classNames={{
                                            base: "gap-1 px-2",
                                        }}
                                        startContent={
                                            <AirplayIcon className="w-3 h-3" strokeWidth={3 / 2} />
                                        }
                                    >
                Adaptive Bitrate Streaming
                                    </Chip>
                                ) : null}
                                {lesson.isTrial ? (
                                    <Chip
                                        variant="flat"
                                        size="sm"
                                        classNames={{
                                            base: "gap-1 px-2",
                                        }}
                                        startContent={
                                            <FlaskConicalIcon className="w-3 h-3" strokeWidth={3 / 2} />
                                        }
                                    >
                Trial
                                    </Chip>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <div>
            {renderLession()}
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Trial</ModalHeader>
                    <ModalBody className="p-4">
                        <VideoPlayer videoType={lesson.videoType} src={
                            lesson.videoType === VideoType.DASH ? 
                                getAssetManifestUrl(lesson.lessonVideoId)
                                : getAssetUrl(lesson.lessonVideoId)
                        }/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )

}