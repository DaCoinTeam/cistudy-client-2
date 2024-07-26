import React, { useContext } from "react"
import {
    CompleteState,
    LessonEntity,
    LockState,
    QuizEntity,
    ResourceEntity,
    SectionContentEntity,
    SectionContentType,
    SectionEntity,
    VideoType,
    parseDuration,
} from "@common"
import { useRouter } from "next/navigation"
import {
    AirplayIcon,
    Clock2Icon,
    FileQuestionIcon,
    HelpCircleIcon,
    PackageIcon,
    TrophyIcon,
    VideoIcon,
} from "lucide-react"
import { ContentDetailsContext } from "../../../_hooks"
import { Chip, Spacer } from "@nextui-org/react"
import {
    CheckCircleIcon as SolidCheckCircleIcon,
    XCircleIcon as SolidXCircleIcon,
} from "@heroicons/react/24/solid"
import { LockClosedIcon, PaperClipIcon } from "@heroicons/react/24/outline"

interface SectionContentItemProps {
  sectionContent: SectionContentEntity;
  section: SectionEntity;
}

const renderComplete = (
    lockState: LockState,
    completeState: CompleteState,
    base: JSX.Element
) => {
    if (lockState === LockState.Locked) {
        return <LockClosedIcon className="w-6 h-6 text-primary" />
    }

    const map: Record<CompleteState, JSX.Element> = {
        [CompleteState.Completed]: (
            <SolidCheckCircleIcon className="w-6 h-6 text-primary" />
        ),
        [CompleteState.Failed]: (
            <SolidXCircleIcon className="w-6 h-6 text-primary" />
        ),
        [CompleteState.Undone]: base,
    }
    return map[completeState]
}

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContent, section } = props
    const { sectionContentId } = sectionContent

    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: currentSectionContent } = sectionContentSwr

    const differentFromThisSection =
    currentSectionContent?.sectionContentId !== sectionContentId

    const router = useRouter()
    const onPress = () =>
        section.lockState !== LockState.Locked && differentFromThisSection
            ? router.push(`/content/${sectionContentId}`)
            : undefined

    const renderLession = (
        { description, durationInSeconds, videoType }: LessonEntity,
        { title, completeState, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        section.lockState ?? LockState.InProgress,
                        completeState,
                        <VideoIcon className="w-6 h-6 text-primary" strokeWidth={3 / 2} />
                    )}
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <div>
                            <span className="font-semibold">{position}. Lesson: </span>
                            <span>{title}</span>
                        </div>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">
                        {description}
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
                            {parseDuration(durationInSeconds ?? 0)}
                        </Chip>
                        {videoType === VideoType.DASH ? (
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
                    </div>
                </div>
            </>
        )
    }

    const renderQuiz = (
        { description, passingScore, questions }: QuizEntity,
        { title, completeState, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        section.lockState ?? LockState.InProgress,
                        completeState,
                        <FileQuestionIcon
                            className="w-6 h-6 text-primary"
                            strokeWidth={3 / 2}
                        />
                    )}
                </div>
                <div className="flex gap-3 items-center">
                    <div>
                        <div>
                            <span className="font-semibold">{position}. Quiz: </span>
                            <span>{title}</span>
                        </div>
                        <div className="text-xs text-foreground-400 line-clamp-1">
                            {description}
                        </div>
                        <Spacer y={1} />
                        <div className="flex gap-2">
                            <Chip
                                classNames={{
                                    base: "gap-1 px-2",
                                }}
                                size="sm"
                                variant="flat"
                                startContent={
                                    <TrophyIcon className="w-3 h-3" strokeWidth={3 / 2} />
                                }
                            >
                                {passingScore}/10 to pass
                            </Chip>
                            <Chip
                                classNames={{
                                    base: "gap-1 px-2",
                                }}
                                size="sm"
                                variant="flat"
                                startContent={
                                    <HelpCircleIcon className="w-3 h-3" strokeWidth={3 / 2} />
                                }
                            >
                                {questions.length} question{questions.length > 1 ? "s" : ""}
                            </Chip>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const renderResource = (
        { description, attachments }: ResourceEntity,
        { title, completeState, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        section.lockState ?? LockState.InProgress,
                        completeState,
                        <PackageIcon className="w-6 h-6 text-primary" strokeWidth={3 / 2} />
                    )}
                </div>
                <div>
                    <div>
                        <span className="font-semibold">{position}. Resource: </span>
                        <span>{title}</span>
                    </div>
                    <div className="text-xs text-foreground-400 line-clamp-1">
                        {description}
                    </div>
                    <Spacer y={1} />
                    <div className="flex gap-2">
                        <Chip
                            classNames={{
                                base: "gap-1 px-2",
                            }}
                            size="sm"
                            variant="flat"
                            startContent={
                                <PaperClipIcon className="w-3 h-3" strokeWidth={3 / 2} />
                            }
                        >
                            {(attachments ?? []).length} attachments
                        </Chip>
                    </div>
                </div>
            </>
        )
    }

    const renderContent = (content: SectionContentEntity) => {
        switch (content.type) {
        case SectionContentType.Lesson:
            return renderLession(content.lesson, content)
        case SectionContentType.Quiz:
            return renderQuiz(content.quiz, content)
        case SectionContentType.Resource:
            return renderResource(content.resource, content)
        }
    }

    return (
        <div
            onClick={onPress}
            className={`cursor-pointer flex gap-3 p-3 px-4 z-10 ${
                !differentFromThisSection ? "bg-content3" : ""
            }`}
        >
            <div className="flex gap-3">{renderContent(sectionContent)}</div>
        </div>
    )
}
