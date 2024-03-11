"use client"
import { Accordion, AccordionItem, Card, CardBody, CardHeader } from "@nextui-org/react"
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
                    title: "text-base font-semibold",
                    content: "flex flex-col gap-4 pb-4 pt-2",
                    subtitle: "text-xs",
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
        <Card shadow="none" className={`${className} bg-transparent border border-divider rounded-medium`}>
            <CardHeader className="text-lg font-semibold p-4 pb-2"> Sections </CardHeader>
            <CardBody className="p-0 gap-0">
                <Accordion
                    selectionMode="multiple"
                    variant="light"
                    className="!px-4"
                    itemClasses={{
                        base: "!shadow-none gap-4",
                    }}
                >
                    {renderSections()}
                </Accordion>
            </CardBody>
        </Card>
    )
}
