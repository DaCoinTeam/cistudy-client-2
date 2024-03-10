"use client"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Divider,
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
                            title: "text-base font-semibold",
                            content: "flex flex-col gap-4 pb-4 pt-2",
                            subtitle: "text-xs",
                        }}
                    >
                        <SectionItem key={section.sectionId} section={section} />
                    </AccordionItem>
                ))}
            </Accordion>
        )
    }

    return (
        <Card shadow="none" className="border border-divider rounded-medium">
            <CardHeader className="text-lg font-semibold p-4 pb-2"> Sections </CardHeader>
            <CardBody className="py-0 px-4 gap-0">
                {renderSections()}
                <Divider/>
                <AddSectionItem />
            </CardBody>
        </Card>
    )
}
