"use client"
import {
    Accordion,
    AccordionItem,
    Divider,
    Spacer,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { AddSectionItem } from "./AddSectionItem"
import { ManagementContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"
import { MoreButton } from "./MoreButton"

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
        const { sections } = courseManagement

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
                        title={section.title}
                        startContent={<MoreButton section={section} />}
                        subtitle={"3 lesson"}
                        classNames={{
                            content: "flex flex-col gap-4 px-4 pb-4 pt-2",
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
            <div className="text-2xl"> Sections </div>
            <Spacer y={4}/>
            <div className={`${className} border border-divider rounded-medium`}>
                {renderSections()}
                <Divider/>
                <AddSectionItem />
            </div>
        </div>
    )
}
