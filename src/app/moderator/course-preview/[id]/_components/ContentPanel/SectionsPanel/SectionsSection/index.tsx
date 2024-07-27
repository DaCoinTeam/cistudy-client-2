"use client"
import {
    Accordion,
    AccordionItem,
    Spacer,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"
import { sortByPosition } from "@common"

interface SectionsSectionProps {
    className?: string
}

export const SectionsSection = (props: SectionsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr

    const renderSections = () => {
        if (!courseManagement) return []
        let { sections } = courseManagement
        sections = sortByPosition(sections)
        
        return (
            <Accordion
                selectionMode="multiple"
                variant="light"
                className="!px-0 gap-4"
                itemClasses={{
                    base: "!shadow-none gap-4",
                }}
            >
                {sections.map((section) => (
                    <AccordionItem
                        key={section.sectionId}
                        title={<div>
                            <span className="font-bold">Section {section.position}: </span>
                            <span> {section.title}</span>
                        </div>}
                        classNames={{
                            content: "flex flex-col gap-4 p-4",
                            heading: "!px-4"
                        }}
                    >
                        <SectionItem key={section.sectionId} section={section} />
                    </AccordionItem>
                ))}
            </Accordion>
        )
    }

    return (
        <div>
            <div className="text-4xl font-bold"> Sections </div>
            <Spacer y={6}/>
            {
                courseManagement && courseManagement.sections.length > 0? (
                    <div className={`${className} border border-divider rounded-medium`}>
                        {renderSections()}
                    </div>
                ) : (
                    <div className="text-xl">
                        There are no sections yet
                    </div>
                )
            }
        </div>
    )
}
