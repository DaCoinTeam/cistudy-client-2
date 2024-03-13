"use client"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { AddSectionItem } from "./AddSectionItem"
import { ManagementContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"
import { MoreButton } from "./MoreButton"
export const SectionsCard = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr

    const renderSections = () => {
        if (!courseManagement) return []
        const { sections } = courseManagement

        return (
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                className="!px-0 gap-4"
                itemClasses={{
                    trigger: "!py-3",
                    base: "!shadow-none border border-divider gap-4",
                }}
            >
                {sections.map((section) => (
                    <AccordionItem
                        key={section.sectionId}
                        title={section.title}
                        startContent={<MoreButton section={section} />}
                        subtitle={"3 lesson"}
                        classNames={{
                            title: "text-base",
                            content: "flex flex-col gap-4 py-3",
                        }}
                    >
                        <SectionItem key={section.sectionId} section={section} />
                    </AccordionItem>
                ))}
            </Accordion>
        )
    }

    return (
        <Card shadow="none" className="border border-divider">
            <CardHeader className="p-6 pb-2">
                <div className="text-xl font-bold leading-none">Sections</div>
            </CardHeader>
            <CardBody className="p-6 gap-4">
                {renderSections()}
                <AddSectionItem />
            </CardBody>
        </Card>
    )
}
