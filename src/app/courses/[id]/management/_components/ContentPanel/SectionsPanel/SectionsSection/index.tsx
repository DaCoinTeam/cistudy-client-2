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
import { SectionEntity } from "@common"

interface SectionsSectionProps {
    className?: string
}

export const SectionsSection = (props: SectionsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const handleSortSection = (sections: Array<SectionEntity>) => {
        return sections.sort((prev: SectionEntity, next: SectionEntity) => Date.parse(prev.createdAt.toString()) - Date.parse(next.createdAt.toString()))
    }

    const renderSections = () => {
        if (!courseManagement) return []
        let { sections } = courseManagement
        sections = handleSortSection(sections)
        

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
                        subtitle={"Add your lessons"}
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
