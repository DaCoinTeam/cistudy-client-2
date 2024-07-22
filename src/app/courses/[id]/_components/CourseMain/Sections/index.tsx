"use client"
import React, { useContext, useMemo } from "react"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../_hooks"

import {
    sortSections,
    LessonEntity,
    parseDuration,
    QuizEntity,
    SectionContentType,
    SectionContentEntity,
} from "@common"
import { Clock2Icon, VideoIcon } from "lucide-react"

export const Sections = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }

    const sortedSections = useMemo(() => sortSections(sections), [sections])

    const renderLession = (
        { description, durationInSeconds }: LessonEntity,
        { title }: SectionContentEntity
    ) => {
        return (
            <>
                <div> <VideoIcon className="w-7.5 h-7.5" strokeWidth={3/2}/></div>
                {/* <InteractiveThumbnail
                    isPressable
                    src={getAssetUrl(thumbnailId)}
                    className="w-40 h-fit"
                /> */}
                <div>
                    <div className="flex gap-1 items-center text-primary">
                        <div className="font-bold">Lession: </div>
                        <div>{title}</div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Clock2Icon className="w-3 h-3" strokeWidth={3/2}/>
                        <div className="text-xs">
                            {parseDuration(durationInSeconds ?? 0)}
                        </div>
                    </div>
                    <Spacer y={1}/>
                    
                    <div className="text-xs text-foreground-400">
                        {description}
                    </div>
                </div>
            </>
        )
    }

    const renderQuiz = (QUIZ: QuizEntity) => {
        return (
            <>
                <div>{/* <div className="font-bold text-primary">{title}</div> */}</div>
            </>
        )
    }

    const renderContent = (content: SectionContentEntity) => {
        const map: Record<SectionContentType, JSX.Element> = {
            [SectionContentType.Lesson]: renderLession(content.lesson, content),
            [SectionContentType.Quiz]: renderQuiz(content.quiz),
        }
        return map[content.type]
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
                        ? sortedSections.map(({ sectionId, contents, title }) => (
                            <AccordionItem
                                key={sectionId}
                                classNames={{
                                    title: "text-lg font-bold text-primary",
                                    subtitle: "font-semibold",
                                }}
                                aria-label="Sections"
                                subtitle={`${contents.length} lessons`}
                                title={title}
                            >
                                {contents.map((sectionContent: SectionContentEntity) => (
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
