"use client"
import React, { useContext, useMemo } from "react"
import { Accordion, AccordionItem, Chip, Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../_hooks"

import {
    LessonEntity,
    parseDuration,
    QuizEntity,
    SectionContentType,
    SectionContentEntity,
    ResourceEntity,
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
import { PaperClipIcon } from "@heroicons/react/24/outline"

export const Sections = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }

    const sortedSections = useMemo(
        () => sortByPosition(sections ?? []),
        [sections]
    )

    const renderLession = (
        { description, durationInSeconds, videoType }: LessonEntity,
        { title, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <VideoIcon
                        className="w-6 h-6 text-foreground-400"
                        strokeWidth={3 / 2}
                    />
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
        { title, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div className="flex gap-3 items-center">
                    <div>
                        <FileQuestionIcon
                            className="w-6 h-6 text-foreground-400"
                            strokeWidth={3 / 2}
                        />
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
                                {passingPercent}% or higer
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
        { title, position }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <PackageIcon
                        className="w-6 h-6 text-foreground-400"
                        strokeWidth={3 / 2}
                    />
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
        <div>
            <div className="text-2xl font-bold">Sections</div>
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
                        ? sortedSections.map(({ sectionId, contents, position, title }) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg",
                                }}
                                aria-label="Sections"
                                subtitle={`${contents.length} contents`}
                                title={
                                    <div>
                                        <span className="font-semibold">Section {position}:</span>{" "}
                                        <span></span>
                                        {title}
                                    </div>
                                }
                            >
                                {sortByPosition(contents).map(
                                    (sectionContent: SectionContentEntity) => (
                                        <div
                                            key={sectionContent.sectionContentId}
                                            className="flex gap-3"
                                        >
                                            {renderContent(sectionContent)}
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
