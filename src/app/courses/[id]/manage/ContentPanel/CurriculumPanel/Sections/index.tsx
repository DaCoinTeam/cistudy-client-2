"use client"
import { SectionEntity } from "@common"
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import { CourseDetailsContext } from "../../../../_hooks"
import { ClockIcon } from "@heroicons/react/24/outline"
import { ResourcesModal } from "./ResourcesModal"

export const Sections = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const renderSections = (): Array<JSX.Element> => {
        if (!course) return []
        const { sections } = course
        const _sections = sections as Array<SectionEntity>

        return _sections.map((section) => (
            <AccordionItem
                key={section.sectionId}
                title={section.title}
                subtitle={"3 lesson"}
            >
                {section.lectures.map((section) => (
                    <Card shadow="none" isPressable fullWidth key={section.sectionId}>
                        <CardBody>
                            <div className="justify-between flex items-center w-full">
                                <div>
                                    <div> {section.title} </div>
                                    <div className="flex items-center gap-1"> <ClockIcon className="w-3 h-3"/> <div className="text-xs text-foreground-500">15 min </div>  </div>
                                </div>
                                <div>
                                    <ResourcesModal lecture={section}/>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </AccordionItem>
        ))
    }
    return (
        <div>
            <Accordion
                selectionMode="multiple"
                showDivider={false}
                className="!px-0"
                itemClasses={{
                    trigger: "!py-0",
                }}
            >
                {renderSections()}
            </Accordion>
        </div>
    )
}
