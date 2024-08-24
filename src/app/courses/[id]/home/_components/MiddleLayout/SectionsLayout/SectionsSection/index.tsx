"use client"
import { Accordion, AccordionItem, Chip, Spacer } from "@nextui-org/react"
import { useContext, useMemo } from "react"
import { HomeContext } from "../../../../_hooks"
import {
    CompleteState,
    LessonEntity,
    LockState,
    parseDuration,
    QuizEntity,
    ResourceEntity,
    SectionContentEntity,
    SectionContentType,
    sortByPosition,
    VideoType,
} from "@common"
import {
    AirplayIcon,
    Clock2Icon,
    FileQuestionIcon,
    HelpCircleIcon,
    PackageIcon,
    TrophyIcon,
    VideoIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

import {
    CheckCircleIcon as SolidCheckCircleIcon,
    XCircleIcon as SolidXCircleIcon,
} from "@heroicons/react/24/solid"
import { CheckCircleIcon, LockClosedIcon, PaperClipIcon } from "@heroicons/react/24/outline"

export const SectionsSection = () => {
    const router = useRouter()
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const { sections } = { ...courseHome }

    const sortedSections = useMemo(
        () => sortByPosition(sections ?? []),
        [sections]
    )

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
                <SolidCheckCircleIcon className="w-6 h-6 text-success" />
            ),
            [CompleteState.Failed]: (
                <SolidXCircleIcon className="w-6 h-6 text-danger" />
            ),
            [CompleteState.Undone]: base,
        }
        return map[completeState]
    }
    

    const renderLesson = (
        { description, durationInSeconds, videoType }: LessonEntity,
        { title, position, completeState }: SectionContentEntity,
        { lockState }: { lockState?: LockState }
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        lockState ?? LockState.InProgress,
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
        { description, passingPercent, questions }: QuizEntity,
        { title, position, completeState }: SectionContentEntity,
        { lockState } : { lockState?: LockState }
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        lockState ?? LockState.InProgress,
                        completeState,
                        <FileQuestionIcon
                            className="w-6 h-6 text-primary"
                            strokeWidth={3 / 2}
                        />
                    )}
                </div>
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
                            {passingPercent}% or higher
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
            </>
        )
    }

    const renderResource = (
        { description, attachments }: ResourceEntity,
        { title, position, completeState }: SectionContentEntity,
        { lockState } : { lockState?: LockState }
    ) => {
        return (
            <>
                <div>
                    {renderComplete(
                        lockState ?? LockState.InProgress,
                        completeState,
                        <PackageIcon
                            className="w-6 h-6 text-primary"
                            strokeWidth={3 / 2}
                        />
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
                            {attachments.length} attachments
                        </Chip>
                    </div>
                </div>
            </>
        )
    }

    const renderContent = (content: SectionContentEntity, section: { lockState?: LockState }) => {
        switch (content.type) {
        case SectionContentType.Lesson:
            return renderLesson(content.lesson, content, section)
        case SectionContentType.Quiz:
            return renderQuiz(content.quiz, content, section)
        case SectionContentType.Resource:
            return renderResource(content.resource, content, section)
        }
    }

    const renderLock = (lockState: LockState) => {
        const map: Record<LockState, JSX.Element> = {
            [LockState.Completed]: (
                <SolidCheckCircleIcon className="w-6 h-6 text-primary" />
            ),
            [LockState.InProgress]: (
                <CheckCircleIcon className="w-6 h-6 text-primary" />
            ),
            [LockState.Locked]: <LockClosedIcon className="w-6 h-6 text-primary" />,
        }
        return map[lockState]
    }
    
    return (
        <div>
            <Spacer y={4} />
            <div className="border border-divider rounded-medium">
                <Accordion
                    itemClasses={{
                        heading: "!px-4 !py-0",
                        content: "flex flex-col gap-4 p-4",
                    }}
                    className="!p-0 gap-4"
                    selectionMode="multiple"
                >
                    {sortedSections
                        ? sortedSections.map(({ sectionId, contents, title, position, lockState }) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg",
                                }}
                                startContent={renderLock(lockState ?? LockState.InProgress)}
                                aria-label="Sections"
                                subtitle={`${contents.length} contents`}
                                title={
                                    <div>
                                        <span className="font-semibold">
                        Section {position}: 
                                        </span>{" "}
                                        {title}
                                    </div>
                                }
                            >
                                {sortByPosition(contents).map(
                                    (sectionContent: SectionContentEntity) => (
                                        <div
                                            key={sectionContent.sectionContentId}
                                            className="flex gap-3 items-center cursor-pointer"
                                            onClick={() => {
                                                router.push(
                                                    `/content/${sectionContent.sectionContentId}`
                                                )
                                            }}
                                        >
                                            {renderContent(sectionContent, { lockState })}
                                        </div>
                                    )
                                )}
                            </AccordionItem>
                        ))
                        : []}
                </Accordion>
            </div>
        </div>
    )
}
