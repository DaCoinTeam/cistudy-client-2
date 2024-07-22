"use client"
import React, { useContext, useMemo } from "react"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../_hooks"

import {
    LessonEntity,
    parseDuration,
    QuizEntity,
    SectionContentType,
    SectionContentEntity,
    ResourceEntity,
    sortByPosition,
} from "@common"
import {
    Clock2Icon,
    FileQuestionIcon,
    PackageIcon,
    VideoIcon,
} from "lucide-react"

export const Sections = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }

    const sortedSections = useMemo(() => sortByPosition(sections ?? []), [sections])

    const renderLession = (
        { description, durationInSeconds }: LessonEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <VideoIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="flex gap-1 items-center text-primary">
                        <div className="font-bold">Lesson: </div>
                        <div>{title}</div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Clock2Icon className="w-3 h-3" strokeWidth={3 / 2} />
                        <div className="text-xs">
                            {parseDuration(durationInSeconds ?? 0)}
                        </div>
                    </div>
                    <Spacer y={1} />

                    <div className="text-xs text-foreground-400">{description}</div>
                </div>
            </>
        )
    }

    const renderQuiz = (
        { }: QuizEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <FileQuestionIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="flex gap-1 items-center text-primary">
                        <div className="font-bold">Quiz: </div>
                        <div>{title}</div>
                    </div>
                </div>
            </>
        )
    }

    const renderResource = (
        resource: ResourceEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div>
                    <PackageIcon className="w-7.5 h-7.5 text-primary" strokeWidth={3 / 2} />
                </div>
                <div>
                    <div className="flex gap-1 items-center text-primary">
                        <div className="font-bold">Resource: </div>
                        <div>{title}</div>
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
                        ? sortedSections.map(({ sectionId, contents, title }, index) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg font-bold text-primary",
                                    subtitle: "font-semibold",
                                }}
                                aria-label="Sections"
                                subtitle={`${contents.length} contents`}
                                title={`Section ${index+1}: ${title}`}
                            >
                                {sortByPosition(contents).map((sectionContent: SectionContentEntity) => (
                                    <div
                                        key={sectionContent.sectionContentId}
                                        className="flex gap-3"
                                    >
                                        {renderContent(sectionContent)}
                                    </div>
                                ))}
                            </AccordionItem>
                        ))
                        : []}
                </Accordion>
            </div>
        </div>
    )
}
