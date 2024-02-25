"use client"
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { AddSectionItem } from "./AddSectionItem"
import { ManageContext } from "../../../../_hooks"
import { SectionItem } from "./SectionItem"

export const Sections = () => {
    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    const renderSections = (): Array<JSX.Element> => {
        if (!courseManaged) return []
        const { sections } = courseManaged

        return sections.map((section) => (
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
        ))
    }
    
    return (
        <div>
            <Accordion
                selectionMode="multiple"
                variant="splitted"
                className="!px-0 gap-4"
                itemClasses={{
                    trigger: "!py-3",
                    base: "!shadow-none !bg-content2",
                }}
            >
                {renderSections()}
            </Accordion>
            <Spacer y={4} />
            <AddSectionItem />
        </div>
    )
}
