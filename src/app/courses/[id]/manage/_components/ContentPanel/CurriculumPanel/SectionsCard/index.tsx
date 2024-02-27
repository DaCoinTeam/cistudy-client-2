"use client"
import { Accordion, AccordionItem, Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import { AddSectionItem } from "./AddSectionItem"
import { ManageContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"

export const SectionsCard = () => {
    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    const renderSections = () => {
        if (!courseManaged) return []
        const { sections } = courseManaged

        return (
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                className="!px-0 gap-4"
                itemClasses={{
                    trigger: "!py-3",
                    base: "!shadow-none !bg-content2",
                }}
            >
                {sections.map((section) => (
                    <AccordionItem
                        key={section.sectionId}
                        title={section.title}
                        subtitle={"3 lesson"}
                        classNames={{
                            title: "text-base",
                            content: "flex flex-col gap-3 py-3",
                        }}
                    >
                        <SectionItem key={section.sectionId} section={section} />
                    </AccordionItem>
                ))}
            </Accordion>
        )
    }

    return (
        <Card shadow="none">
            <CardHeader className="p-4 pb-0 text-xl font-semibold">
                Sections
            </CardHeader>
            <CardBody className="p-4 gap-4 pt-4">
                {renderSections()}
                <AddSectionItem />
            </CardBody>
        </Card>
    )
}
