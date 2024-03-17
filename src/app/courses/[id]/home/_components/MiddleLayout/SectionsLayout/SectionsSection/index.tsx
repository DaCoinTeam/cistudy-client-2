"use client"
import { Accordion, AccordionItem } from "@nextui-org/react"
import React, { useContext } from "react"
import { LectureItem } from "./LectureItem"
import { HomeContext } from "../../../../_hooks"

interface SectionsSectionProps {
  className?: string;
}

export const SectionsSection = (props: SectionsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const { sections } = { ...courseHome }

    const renderSections = () => {
        if (!sections) return []
        return sections.map(({ sectionId, title, lectures }) => (
            <AccordionItem
                key={sectionId}
                classNames={{
                    content: "flex flex-col gap-4 pb-4 pt-2",
                }}
                title={title}
                subtitle={`${lectures.length} lectures`}
            >
                {lectures.map((lecture) => (
                    <LectureItem key={lecture.lectureId} lecture={lecture} />
                ))}
            </AccordionItem>
        ))
    }

    return (
        <div className={`${className}`}>
            <div className="border border-divider rounded-medium">
                <Accordion
                    selectionMode="multiple"
                    variant="light"
                    className="!px-0"
                    itemClasses={{
                        base: "!shadow-none gap-4 px-4",
                    }}
                >
                    {renderSections()}
                </Accordion>
            </div>
        </div>
    )
}
