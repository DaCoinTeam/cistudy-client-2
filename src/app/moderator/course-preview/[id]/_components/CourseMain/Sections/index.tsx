"use client"
import React, { useContext } from "react"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import { CoursePreviewContext } from "../../../_hooks"
import { LessonItem } from "./LessonItem"


export const Sections = () => {
    const { swrs } = useContext(CoursePreviewContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { sections } = { ...course }

    return (
        <div>
            <div className="text-2xl">Sections</div>
            <Spacer y={4}/>
            <div className="border border-divider rounded-medium">
                <Accordion
                    itemClasses={{
                        heading: "!px-4 !py-0",
                        content: "flex flex-col gap-4 p-4",
                    }}
                    className="!p-0 gap-4"
                    selectionMode="multiple"
                >
                    {sections
                        ? sections.map(({ sectionId, title, lessons }) => (
                            <AccordionItem
                                key={sectionId}
                                aria-label="Sections"
                                subtitle={
                                    `${lessons.length} lessons`
                                }
                                title={title}
                            >
                                {lessons.map((lesson) => (
                                    <LessonItem key={lesson.lessonId} lesson={lesson} />
                                ))}
                            </AccordionItem>
                        ))
                        : []}
                </Accordion>
            </div>
        </div>
    )
}