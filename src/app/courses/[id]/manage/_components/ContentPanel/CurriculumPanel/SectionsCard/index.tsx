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
import { ManageContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"
import { SectionItemMoreButton } from "./SectionItemMoreButton"
import { Actions } from "./Actions"

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
                    base: "!shadow-none !bg-content2 gap-4",
                }}
            >
                {sections.map((section) => (
                    <AccordionItem
                        key={section.sectionId}
                        title={section.title}
                        startContent={<SectionItemMoreButton/>}
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
        <Card shadow="none" className="border-divider border">
            <CardHeader className="p-6 pb-0 justify-between items-center">
                <div className="text-xl font-semibold leading-none">Sections</div>
                <Actions />
            </CardHeader>
            <CardBody className="p-6 gap-4">
                {renderSections()}
                <AddSectionItem />
            </CardBody>
        </Card>
    )
}
